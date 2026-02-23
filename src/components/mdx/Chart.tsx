"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartProps {
  type: "bar" | "line" | "pie" | "area";
  data: Record<string, unknown>[];
  xKey?: string;
  yKey?: string;
  colors?: string[];
  height?: number;
}

const DEFAULT_COLORS = [
  "#02001A",
  "#4A90D9",
  "#50C878",
  "#FF6B6B",
  "#FFD93D",
  "#6C5CE7",
];

export function Chart({
  type,
  data,
  xKey = "name",
  yKey = "value",
  colors = DEFAULT_COLORS,
  height = 400,
}: ChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="my-6 flex w-full items-center justify-center text-2xl text-gray-400" style={{ height }}>
        No data
      </div>
    );
  }

  return (
    <div className="my-6 w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart(type, data, xKey, yKey, colors)}
      </ResponsiveContainer>
    </div>
  );
}

function renderChart(
  type: ChartProps["type"],
  data: Record<string, unknown>[],
  xKey: string,
  yKey: string,
  colors: string[],
) {
  switch (type) {
    case "bar":
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yKey} fill={colors[0]} />
        </BarChart>
      );
    case "line":
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yKey} stroke={colors[0]} strokeWidth={2} />
        </LineChart>
      );
    case "area":
      return (
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey={yKey} fill={colors[0]} stroke={colors[0]} fillOpacity={0.3} />
        </AreaChart>
      );
    case "pie":
      return (
        <PieChart>
          <Pie
            data={data}
            dataKey={yKey}
            nameKey={xKey}
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
    default:
      return (
        <BarChart data={data}>
          <Bar dataKey={yKey} fill={colors[0]} />
        </BarChart>
      );
  }
}
