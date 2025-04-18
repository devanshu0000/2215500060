import { type NextRequest, NextResponse } from "next/server"

// Set window size
const WINDOW_SIZE = 10

// Store the current window state
let windowState: number[] = []

// API endpoints
const API_BASE_URL = "http://20.244.56.144/evaluation-service"
const API_ENDPOINTS = {
  rand: `${API_BASE_URL}/rand`,
  primes: `${API_BASE_URL}/primes`,
  fibo: `${API_BASE_URL}/fibo`,
  even: `${API_BASE_URL}/even`,
}

export async function GET(request: NextRequest, { params }: { params: { type: string } }) {
  try {
    const type = params.type

    // Check if the requested type is valid
    if (!Object.keys(API_ENDPOINTS).includes(type)) {
      return NextResponse.json({ error: "Invalid number type. Use rand, primes, fibo, or even." }, { status: 400 })
    }

    // Fetch numbers from the external API
    const response = await fetch(API_ENDPOINTS[type as keyof typeof API_ENDPOINTS])

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch data from external API" }, { status: 502 })
    }

    const data = await response.json()
    const numbers = data.numbers || []

    // Store previous window state
    const windowPrevState = [...windowState]

    // Update window state with new numbers
    // Keep only the most recent WINDOW_SIZE numbers
    windowState = [...windowState, ...numbers].slice(-WINDOW_SIZE)

    // Calculate average of current window
    const avg =
      windowState.length > 0 ? (windowState.reduce((sum, num) => sum + num, 0) / windowState.length).toFixed(2) : "0.00"

    // Prepare response
    const result = {
      windowPrevState,
      windowCurrState: windowState,
      numbers,
      avg,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
