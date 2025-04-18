"use client"

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

interface ChartProps {
  data: any[]
  xAxisKey: string
  yAxisKey: string
  height?: number
}

export function LineChart({ data, xAxisKey, yAxisKey, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={yAxisKey}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function BarChart({ data, xAxisKey, yAxisKey, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
        <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
        <Tooltip />
        <Bar dataKey={yAxisKey} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function BarChartHorizontal({ data, xAxisKey, yAxisKey, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
        <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
        <YAxis type="category" dataKey={yAxisKey} tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
        <Tooltip />
        <Bar dataKey={xAxisKey} fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

interface PieChartProps {
  data: any[]
  nameKey: string
  dataKey: string
  height?: number
}

export function PieChart({ data, nameKey, dataKey, height = 300 }: PieChartProps) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
