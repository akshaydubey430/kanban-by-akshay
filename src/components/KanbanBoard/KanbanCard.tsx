import React from "react";
import {
  formatDateShort,
  getInitials,
  isOverdue,
  priorityColor,
} from "../../utils/task.utils";

export const KanbanCard = ({ task, index, columnId, onOpen, onDragStart }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(task)}
      onPointerDown={(ev) =>
        onDragStart?.(task.id, columnId, index, ev.clientY)
      }
      className={`kanban-card bg-white dark:bg-gray-800 border border-neutral-200 dark:border-gray-600 rounded-lg p-3 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-0.5 cursor-grab ${priorityColor(
        task.priority
      )}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm line-clamp-2">{task.title}</h4>
        {task.priority && (
          <span
            className={`
    text-xs px-2 py-1 rounded-full font-medium
    ${
      task.priority === "urgent"
        ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
        : task.priority === "high"
        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
        : task.priority === "medium"
        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
        : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
    }
  `}
          >
            {task.priority}
          </span>
        )}
      </div>
      {task.description && (
        <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className={`
      text-xs font-medium px-2 py-0.5 rounded-full capitalize
      ${
        tag.toLowerCase() === "frontend"
          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
          : tag.toLowerCase() === "backend"
          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
          : tag.toLowerCase() === "design"
          ? "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300"
          : tag.toLowerCase() === "setup"
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
          : tag.toLowerCase() === "ui"
          ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300"
          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
      }
    `}
            >
              {tag}
            </span>
          ))}
        </div>
        {task.assignee && (
          <div className="w-6 h-6 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">
            {getInitials(task.assignee)}
          </div>
        )}
      </div>
      {task.dueDate && (
        <div
          className={`text-xs mt-2 ${
            isOverdue(task.dueDate) ? "text-red-600" : "text-neutral-500"
          }`}
        >
          Due: {formatDateShort(task.dueDate)}
        </div>
      )}
    </div>
  );
};
