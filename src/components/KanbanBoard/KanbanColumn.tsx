import React from "react";
import { KanbanCard } from "./KanbanCard";
import { Button } from "../primitives/Button";

export const KanbanColumn = ({
  column,
  tasks,
  onOpenTask,
  onAdd,
  onDragStart,
}) => {
  return (
    <div
      role="region"
      aria-label={`${column.title} column. ${tasks.length} tasks.`}
      className="
        w-72 sm:w-80 min-w-[260px] sm:min-w-[300px] max-w-full flex-shrink-0  flex flex-col 
        bg-white dark:bg-gray-800 
        rounded-xl p-4 gap-3 shadow-sm border border-neutral-200 dark:border-gray-700 
        transition-colors
      "
    >
      {/* Column Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 py-1 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-800 dark:text-white">
              {column.title}
            </h3>
            <div className="text-xs text-neutral-500 dark:text-gray-400">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-auto" style={{ maxHeight: "60vh" }}>
        <div className="flex flex-col gap-3">
          {tasks.map((t, idx) => (
            <KanbanCard
              key={t.id}
              task={t}
              index={idx}
              columnId={column.id}
              onOpen={onOpenTask}
              onDragStart={onDragStart}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-sm text-neutral-500 dark:text-gray-400 p-4 text-center italic">
              No tasks in this column
            </div>
          )}
        </div>
      </div>

      {/* Add Task Button */}
      <div className="mt-3">
        <Button
          variant="ghost"
          onClick={() => onAdd(column.id)}
          className="
            w-full justify-center 
            bg-neutral-100 hover:bg-neutral-200 text-neutral-700 
            dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 
            transition-colors shadow-sm
          "
        >
          + Add Task
        </Button>
      </div>
    </div>
  );
};
