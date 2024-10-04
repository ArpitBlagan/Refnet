import React from 'react'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Normal', value: 400 },
  { name: 'Impressive', value: 300 },
  { name: 'Excellent', value: 300 }
]

// Linear gradient colors
const COLORS = ['url(#gradientNormal)', 'url(#gradientImpressive)', 'url(#gradientExcellent)']
const calculatePercentage = (value: number, total: number) => {
  return ((value / total) * 100).toFixed(1) // 1 decimal place
}
const SCORES = {
  normal: 1,
  impressive: 3,
  excellent: 5
}
const PieChartComponent = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0)
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        {/* Define linear gradients */}
        <defs>
          <linearGradient id="gradientNormal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#56CCF2" />
            <stop offset="100%" stopColor="#2F80ED" />
          </linearGradient>

          <linearGradient id="gradientImpressive" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6A11CB" />
            <stop offset="100%" stopColor="#2575FC" />
          </linearGradient>

          <linearGradient id="gradientExcellent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F2994A" />
            <stop offset="100%" stopColor="#F2C94C" />
          </linearGradient>
        </defs>

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${name}: ${calculatePercentage(value, total)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* Tooltip to display actual count on hover */}
        <Tooltip formatter={(value: number) => `Count: ${value}`} />

        <Legend verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent
