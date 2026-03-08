
import React from "react";

interface DataPoint {
  date: string;
  visitors: number;
  pageViews: number;
}

interface MiniLineChartProps {
  data: DataPoint[];
  metric: "visitors" | "pageViews";
  color: string;
}

export default function MiniLineChart({
  data,
  metric,
  color,
}: MiniLineChartProps) {
  // Guard against empty data to avoid runtime errors
  if (!data || data.length === 0) {
    return (
      <svg viewBox="0 0 600 120" className="w-full h-full">
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="12"
        >
          No data available
        </text>
      </svg>
    );
  }

  const values = data.map((d) => d[metric]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1; // Prevent division by zero
  const width = 600;
  const height = 120;
  const padding = { top: 10, right: 10, bottom: 24, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Build polyline points
  const points = values.map((v, i) => {
    const x = padding.left + (i / (values.length - 1)) * chartWidth;
    const y =
      padding.top + chartHeight - ((v - min) / range) * chartHeight;
    return `${x},${y}`;
  });

  // Build area polygon points (filled under the line)
  const areaPoints = [
    `${padding.left},${padding.top + chartHeight}`,
    ...points,
    `${padding.left + chartWidth},${padding.top + chartHeight}`,
  ].join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <linearGradient
          id={`grad-${metric}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Filled area under the line */}
      <polygon points={areaPoints} fill={`url(#grad-${metric})`} />

      {/* The line itself */}
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Data points and optional date labels */}
      {data.map((d, i) => {
        const x =
          padding.left + (i / (values.length - 1)) * chartWidth;
        const y =
          padding.top +
          chartHeight -
          ((values[i] - min) / range) * chartHeight;
        const showLabel =
          i === 0 ||
          i === Math.floor(data.length / 2) ||
          i === data.length - 1;

        return (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill={color} />
            {showLabel && (
              <text
                x={x}
                y={height - 4}
                textAnchor="middle"
                fontSize="9"
                fill="#6B7280"
              >
                {d.date}
              </text>
            )}
          </g>
        );
      })}

      {/* Y‑axis metric labels */}
      {[min, Math.round((min + max) / 2), max].map((v, i) => {
        const y =
          padding.top + chartHeight - ((v - min) / range) * chartHeight;
        return (
          <text
            key={i}
            x={padding.left - 4}
            y={y + 3}
            textAnchor="end"
            fontSize="9"
            fill="#6B7280"
          >
            {v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
          </text>
        );
      })}
    </svg>
  );
}
