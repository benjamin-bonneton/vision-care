// React
import React, { useState } from "react";

// Styles
import "../assets/css/components/history.css";

// Types
import type { HistoryItemProps } from "../types/components/history.tsx";

// Icons
import workIcon from "../assets/icons/work.svg";
import breakIcon from "../assets/icons/break.svg";

// Function
function getTimeString(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join("");
}

const ITEMS_PER_PAGE = 6;

const getHistoryData = () => {
  return JSON.parse(localStorage.getItem("history") || "[]");
};

const getHistoryItems = (history: HistoryItemProps[], visibleCount: number) => {
  return history
    .slice(0, visibleCount)
    .map((item: HistoryItemProps, index: number) => (
      <HistoryItem
        key={index}
        imgSrc={item.altText === "Work Session" ? workIcon : breakIcon}
        altText={item.altText}
        time={item.time}
        date={item.date}
      />
    ));
};

// Stats Component
const History = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const history = getHistoryData().slice().reverse();
  const hasMore = visibleCount < history.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="history">
      {getHistoryItems(history, visibleCount)}
      {hasMore && (
        <button className="history-load-more" onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

const HistoryItem: React.FC<HistoryItemProps> = ({
  imgSrc,
  altText,
  time,
  date,
}) => {
  return (
    <div className="history-item">
      <div className="history-item-header">
        <img src={imgSrc} alt={altText} />
        <p>{altText}</p>
      </div>
      <div className="history-item-time">
        <p>
          {getTimeString(time)} - {new Date(date).toLocaleDateString()} -{" "}
          {new Date(date).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default History;
