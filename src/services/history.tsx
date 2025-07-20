// Types
import type { HistoryItemProps } from "../types/services/history";

const createHistoryItem = ({ altText, time }: HistoryItemProps) => {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  history.unshift({
    altText,
    time,
    date: new Date().toISOString(),
  });
  localStorage.setItem("history", JSON.stringify(history));
};

export default createHistoryItem;
