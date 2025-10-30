import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const TaskModal = ({ task, open, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [isVisible, setIsVisible] = useState(false);
  const [priority, setPriority] = useState(task?.priority || "");
  // Sync fields when a new task opens
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "");
    }
  }, [task]);
  // Animate fade in/out
  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 200); // fade out delay
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!isVisible || !task) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center 
                bg-black/50 dark:bg-black/70 backdrop-blur-sm 
                transition-opacity duration-200 
                ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
    >
      {/* outer scroll wrapper */}
      <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div
          className="relative w-full max-w-md sm:max-w-lg md:max-w-xl 
                   bg-white dark:bg-gray-800 
                   text-neutral-900 dark:text-gray-100 
                   shadow-2xl border border-neutral-200 dark:border-gray-700 
                   rounded-xl p-5 sm:p-6 space-y-5 
                   transition-all transform scale-100 animate-fadeIn"
        >
          {/* Header */}
          <h2 className="text-lg font-semibold dark:text-white">Edit Task</h2>

          {/* Title */}
          <div>
            <label className="text-sm font-medium block mb-1 dark:text-gray-300">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg 
                       border border-neutral-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 
                       text-neutral-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-blue-500 outline-none 
                       transition-colors"
            />
          </div>
          {/* Priority selector */}
          <div>
            <label className="text-sm font-medium block mb-1 dark:text-gray-300">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)} // ✅ updates state immediately
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-gray-600 
               bg-white dark:bg-gray-700 text-neutral-900 dark:text-gray-100 
               focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Tags input */}
          <div>
            <label className="text-sm font-medium block mb-1 dark:text-gray-300">
              Tags (comma separated)
            </label>
            <input
              value={(task.tags || []).join(", ")}
              onChange={(e) =>
                onSave({
                  ...task,
                  tags: e.target.value.split(",").map((t) => t.trim()),
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-gray-600 
               bg-white dark:bg-gray-700 text-neutral-900 dark:text-gray-100 
               focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium block mb-1 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-lg 
                       border border-neutral-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 
                       text-neutral-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-blue-500 outline-none 
                       transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-neutral-200 dark:border-gray-700">
            <button
              onClick={() => {
                onDelete(task);
                onClose();
              }}
              className="px-4 py-2 rounded-md text-sm font-medium w-full sm:w-auto
                       bg-red-100 hover:bg-red-200 text-red-700
                       dark:bg-red-700 dark:hover:bg-red-600 dark:text-gray-100
                       transition-colors"
            >
              Delete
            </button>

            <div className="flex gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md text-sm font-medium w-full sm:w-auto
                         bg-neutral-100 hover:bg-neutral-200 text-neutral-700
                         dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100
                         transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onSave({ ...task, title, description });
                  onClose();
                }}
                className="px-4 py-2 rounded-md text-sm font-semibold w-full sm:w-auto
                         bg-blue-600 hover:bg-blue-700 text-white
                         dark:bg-blue-500 dark:hover:bg-blue-400
                         transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
