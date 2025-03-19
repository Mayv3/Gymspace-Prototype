"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  {
    name: "Ene",
    total: 1800,
  },
  {
    name: "Feb",
    total: 2200,
  },
  {
    name: "Mar",
    total: 2800,
  },
  {
    name: "Abr",
    total: 2400,
  },
  {
    name: "May",
    total: 2900,
  },
  {
    name: "Jun",
    total: 3200,
  },
  {
    name: "Jul",
    total: 3500,
  },
  {
    name: "Ago",
    total: 3800,
  },
  {
    name: "Sep",
    total: 3600,
  },
  {
    name: "Oct",
    total: 3200,
  },
  {
    name: "Nov",
    total: 3400,
  },
  {
    name: "Dic",
    total: 3800,
  },
]

export function Overview() {
  return (
    <div className="h-[300px] sm:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(255, 255, 255, 0.1)"
            className="dark:stroke-gray-800"
          />
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            className="dark:text-gray-400"
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            width={50}
            className="dark:text-gray-400"
          />
          <Tooltip
            formatter={(value) => [`$${value}`, "Ingresos"]}
            contentStyle={{
              backgroundColor: "rgba(48, 47, 47, 0.95)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(221, 206, 206, 0.06)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            }}
            cursor={{ fill: "rgba(163, 116, 83, 0.1)" }}
          />
          <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

