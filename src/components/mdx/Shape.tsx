"use client";

interface ShapeProps {
  type: "circle" | "rectangle" | "triangle" | "arrow" | "line";
  size?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

export function Shape({
  type,
  size = 100,
  fill = "var(--slide-primary)",
  stroke = "none",
  strokeWidth = 2,
  className,
}: ShapeProps) {
  const svgProps = {
    width: size,
    height: size,
    className,
    viewBox: `0 0 ${size} ${size}`,
  };

  switch (type) {
    case "circle":
      return (
        <svg {...svgProps}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    case "rectangle":
      return (
        <svg {...svgProps}>
          <rect
            x={strokeWidth}
            y={strokeWidth}
            width={size - strokeWidth * 2}
            height={size - strokeWidth * 2}
            rx={4}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    case "triangle":
      return (
        <svg {...svgProps}>
          <polygon
            points={`${size / 2},${strokeWidth} ${size - strokeWidth},${size - strokeWidth} ${strokeWidth},${size - strokeWidth}`}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    case "arrow":
      return (
        <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`} className={className}>
          <line
            x1={0}
            y1={size / 4}
            x2={size * 0.75}
            y2={size / 4}
            stroke={fill}
            strokeWidth={strokeWidth * 2}
          />
          <polygon
            points={`${size * 0.7},0 ${size},${size / 4} ${size * 0.7},${size / 2}`}
            fill={fill}
          />
        </svg>
      );
    case "line":
      return (
        <svg width={size} height={strokeWidth * 2} viewBox={`0 0 ${size} ${strokeWidth * 2}`} className={className}>
          <line
            x1={0}
            y1={strokeWidth}
            x2={size}
            y2={strokeWidth}
            stroke={fill}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
  }
}
