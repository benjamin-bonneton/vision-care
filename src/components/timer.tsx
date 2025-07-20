// React
import React from "react";

// Styles
import "../assets/css/components/timer.css";

// Types
import type { TimerProps } from "../types/components/timer.tsx";

// Function
function getTimeString(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}`);
  if (minutes > 0) parts.push(`${minutes}`);
  else parts.push("00");
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}`);
  else parts.push("00");

  return parts.join(" : ");
}

// Stats Component
const Stats: React.FC<TimerProps> = ({ time }) => {
  return (
    <div className="timer">
      <p>{getTimeString(time)}</p>
    </div>
  );
};

export default Stats;
