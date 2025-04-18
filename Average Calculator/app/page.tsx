"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export default function Home() {
  const [type, setType] = useState<string>("r")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [responseTime, setResponseTime] = useState<number | null>(null)

  const fetchNumbers = async () => {
    setLoading(true)
    setError(null)
    const startTime = performance.now()

    try {
      const response = await fetch(`/api/numbers/${type}`)
      const endTime = performance.now()
      setResponseTime(endTime - startTime)

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      setError(`Error: ${err.message}`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const typeLabels: Record<string, string> = {
    p: "Prime Numbers",
    f: "Fibonacci Numbers",
    e: "Even Numbers",
    r: "Random Numbers",
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Average Calculator Microservice</CardTitle>
          <CardDescription>
            Fetch numbers from different APIs and calculate their average using a sliding window
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select number type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p">Prime Numbers (p)</SelectItem>
                  <SelectItem value="f">Fibonacci Numbers (f)</SelectItem>
                  <SelectItem value="e">Even Numbers (e)</SelectItem>
                  <SelectItem value="r">Random Numbers (r)</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={fetchNumbers} className="w-full sm:w-auto" disabled={loading}>
                {loading ? "Loading..." : "Fetch Numbers"}
              </Button>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}

            {responseTime !== null && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  Response time:{" "}
                  <Badge variant={responseTime < 500 ? "outline" : "destructive"}>{responseTime.toFixed(2)}ms</Badge>
                </span>
              </div>
            )}

            {result && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-100 rounded-md">
                    <h3 className="font-medium mb-2">Previous Window State</h3>
                    <div className="overflow-x-auto">
                      {result.windowPrevState.length > 0 ? result.windowPrevState.join(", ") : "Empty"}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-md">
                    <h3 className="font-medium mb-2">Current Window State</h3>
                    <div className="overflow-x-auto">
                      {result.windowCurrState.length > 0 ? result.windowCurrState.join(", ") : "Empty"}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-100 rounded-md">
                  <h3 className="font-medium mb-2">Fetched Numbers ({typeLabels[type]})</h3>
                  <div className="overflow-x-auto">
                    {result.numbers.length > 0 ? result.numbers.join(", ") : "No new numbers"}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="font-medium mb-2">Average</h3>
                  <div className="text-2xl font-bold text-blue-600">{result.avg}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-500">Window Size: 10 | Timeout: 500ms</p>
        </CardFooter>
      </Card>
    </main>
  )
}
