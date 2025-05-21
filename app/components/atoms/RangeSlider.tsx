/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  color?: "green" | "blue" | "gray";
  label?: (value: number) => string;
  className?: string;
  style?: React.CSSProperties;
  marks?: Array<{ value: number; label: string }>;
}

export default function RangeSlider({
  min,
  max,
  step = 1,
  defaultValue,
  value,
  onChange,
  color = "green",
  label,
  className,
  style,
  marks,
}: RangeSliderProps) {
  const [localValues, setLocalValues] = useState<[number, number]>(
    value || defaultValue || [min, max]
  );
  const [dragging, setDragging] = useState<number | null>(null);
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Update local values when controlled value changes
  useEffect(() => {
    if (value) {
      setLocalValues(value);
    }
  }, [value]);

  // Calculate percentage for positioning
  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  // Get value from percentage
  const getValueFromPercent = (percent: number) => {
    const rawValue = min + ((max - min) * percent) / 100;
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(Math.max(steppedValue, min), max);
  };

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    const newValue = getValueFromPercent(percent);

    // Determine which thumb to move (closest one)
    const distToLower = Math.abs(newValue - localValues[0]);
    const distToUpper = Math.abs(newValue - localValues[1]);

    let newValues: [number, number];
    if (distToLower <= distToUpper) {
      newValues = [newValue, localValues[1]];
    } else {
      newValues = [localValues[0], newValue];
    }

    setLocalValues(newValues);
    onChange?.(newValues);
  };

  // Handle thumb drag start
  const handleThumbMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(index);
  };

  // Handle mouse move during drag
  useEffect(() => {
    if (dragging === null) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      const newValue = getValueFromPercent(percent);

      let newValues: [number, number];
      if (dragging === 0) {
        // Don't allow lower thumb to go above upper thumb
        newValues = [Math.min(newValue, localValues[1]), localValues[1]];
      } else {
        // Don't allow upper thumb to go below lower thumb
        newValues = [localValues[0], Math.max(newValue, localValues[0])];
      }

      setLocalValues(newValues);
      onChange?.(newValues);
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, localValues, min, max, step, onChange]);

  // Color classes
  const colorClasses = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    gray: "bg-gray-500",
  };

  // Format value for display
  const formatValue = (value: number) => {
    if (label) {
      return label(value);
    }
    return value.toString();
  };

  return (
    <div className={cn("relative py-5", className)} style={style}>
      {/* Track */}
      <div
        ref={trackRef}
        className="h-2 w-full bg-gray-100 rounded-full cursor-pointer"
        onClick={handleTrackClick}
      >
        {/* Range fill */}
        <div
          className={cn("absolute h-2 rounded-full", colorClasses[color])}
          style={{
            left: `${getPercentage(localValues[0])}%`,
            width: `${
              getPercentage(localValues[1]) - getPercentage(localValues[0])
            }%`,
          }}
        />

        {/* Tick marks */}
        {marks &&
          marks.map((mark) => (
            <div
              key={mark.value}
              className="absolute top-6 -translate-x-1/2 flex flex-col items-center"
              style={{
                left: `${getPercentage(mark.value)}%`,
              }}
            >
              <div className="w-0.5 h-2 bg-gray-400 mb-1"/>
              <span className="text-xs text-gray-600 whitespace-nowrap">
                {mark.label}
              </span>
            </div>
          ))}
      </div>

      {/* Thumbs */}
      {[0, 1].map((index) => (
        <div
          key={index}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 bg-white cursor-grab active:cursor-grabbing",
            dragging === index ? "z-20" : "z-10",
            color === "green"
              ? "border-green-500"
              : color === "blue"
              ? "border-blue-500"
              : "border-gray-500"
          )}
          style={{
            left: `calc(${getPercentage(localValues[index])}% - 10px)`,
          }}
          onMouseDown={handleThumbMouseDown(index)}
          onMouseEnter={() => setHoveredThumb(index)}
          onMouseLeave={() => setHoveredThumb(null)}
        >
          {/* Tooltip */}
          {hoveredThumb === index && (
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              {formatValue(localValues[index])}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
