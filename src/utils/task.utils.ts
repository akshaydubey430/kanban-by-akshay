import {
  KanbanTask,
  Priority,
} from "../components/KanbanBoard/KanbanBoard.types";

export const isOverdue = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  return new Date() > new Date(dueDate);
};

export const formatDateShort = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString();
};

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const priorityColor = (p?: Priority) => {
  switch (p) {
    case "low":
      return "border-l-4 border-blue-400";
    case "medium":
      return "border-l-4 border-yellow-400";
    case "high":
      return "border-l-4 border-orange-400";
    case "urgent":
      return "border-l-4 border-red-500";
    default:
      return "border-l-4 border-neutral-300";
  }
};

export const reorderArray = (arr, fromIndex, toIndex) => {
  const a = arr.slice();
  const [item] = a.splice(fromIndex, 1);
  a.splice(toIndex, 0, item);
  return a;
};

export const moveBetween = (src, dest, srcIndex, destIndex) => {
  const s = src.slice();
  const d = dest.slice();
  const [item] = s.splice(srcIndex, 1);
  d.splice(destIndex, 0, item);
  return { source: s, destination: d };
};
