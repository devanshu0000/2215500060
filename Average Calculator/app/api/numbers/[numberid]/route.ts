import { type NextRequest, NextResponse } from "next/server"

// Configuration
const WINDOW_SIZE = 10
const TIMEOUT_MS = 500

// Store the current window state (using a Map to ensure uniqueness and preserve order)
const numberWindow = new Map<number, number>()

// API endpoints mapping
const API_BASE_URL = "http://20.244.56.144/evaluation-service"
const API_ENDPOINTS: Record<string, string> = {
  p: `${API_BASE_URL}/primes`,
  f: `${API_BASE_URL}/fibo`,
  e: `${API_BASE_URL}/even`,
  r: `${API_BASE_URL}/rand`,
}

// Helper function to fetch with timeout
async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function GET(request: NextRequest, { params }: { params: { numberid: string } }): Promise<NextResponse> {
  try {
    const numberid = params.numberid

    // Validate the number ID
    if (!["p", "f", "e", "r"].includes(numberid)) {
      return NextResponse.json(
        { error: "Invalid number ID. Use 'p' for prime, 'f' for Fibonacci, 'e' for even, or 'r' for random numbers." },
        { status: 400 },
      )
    }

    // Store the previous window state (convert Map to array)
    const windowPrevState = Array.from(numberWindow.values())

    // Fetch numbers from the external API with timeout
    let newNumbers: number[] = []
    try {
      const response = await fetchWithTimeout(API_ENDPOINTS[numberid], TIMEOUT_MS)

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()
      newNumbers = data.numbers || []
    } catch (error) {
      console.error("Error fetching from external API:", error)
      // Continue with empty new numbers on timeout or error
    }

    // Add new unique numbers to the window
    for (const num of newNumbers) {
      // If the window is full, remove the oldest entry
      if (numberWindow.size >= WINDOW_SIZE) {
        const oldestKey = numberWindow.keys().next().value
        numberWindow.delete(oldestKey)
      }

      // Add the new number with a timestamp as key for ordering
      numberWindow.set(Date.now() + Math.random(), num)
    }

    // Calculate average
    const currentNumbers = Array.from(numberWindow.values())
    const avg =
      currentNumbers.length > 0
        ? (currentNumbers.reduce((sum, num) => sum + num, 0) / currentNumbers.length).toFixed(2)
        : "0.00"

    // Prepare response
    const result = {
      windowPrevState,
      windowCurrState: currentNumbers,
      numbers: newNumbers,
      avg,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
