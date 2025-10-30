import React, { useCallback, useMemo, useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { TaskModal } from "./TaskModal";

export const KanbanBoard = ({
  columns,
  tasks,
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
}) => {
  const { drag, startDrag, updateDrag, endDrag } = useDragAndDrop();
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const tasksByColumn = useMemo(() => {
    return columns.reduce((acc, col) => {
      acc[col.id] = col.taskIds.map((id) => tasks[id]).filter(Boolean);
      return acc;
    }, {});
  }, [columns, tasks]);

  const handleOpen = (task) => {
    setEditing(task);
    setModalOpen(true);
  };

  const handleAdd = (columnId) => {
    const id = `task-${Date.now()}`;
    const priorities = ["low", "medium", "high", "urgent"];
    const randomPriority =
      priorities[Math.floor(Math.random() * priorities.length)];

    const newTask = {
      id,
      title: "New Task",
      description: "Click to edit task details",
      status: columnId,
      priority: randomPriority,
      assignee: "Akshay Dubey",
      tags: ["new"],
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // +3 days
    };

    onTaskCreate(columnId, newTask);
    setEditing(newTask);
    setModalOpen(true);
  };

  const handleDragStart = (taskId, columnId, index, clientY) => {
    startDrag(taskId, columnId, index, clientY);
  };

  const handlePointerUp = (e) => {
    if (!drag.draggingId || !drag.originColumn || drag.index === null) {
      endDrag();
      return;
    }
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) {
      endDrag();
      return;
    }
    const colEl = el.closest('[role="region"]');
    if (!colEl) {
      endDrag();
      return;
    }
    const targetLabel = colEl.getAttribute("aria-label") ?? "";
    const targetCol =
      columns.find((c) => targetLabel.startsWith(c.title)) ??
      columns.find((c) => c.id === drag.originColumn);
    const targetIndex = targetCol.taskIds.length;
    onTaskMove(drag.draggingId, drag.originColumn, targetCol.id, targetIndex);
    endDrag();
  };

  return (
    <div
      onPointerUp={handlePointerUp}
      onPointerMove={(e) => updateDrag(e.clientY)}
      className="p-4"
    >
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory">
        {columns.map((col) => (
          <div key={col.id} className="snap-start">
            <KanbanColumn
              column={col}
              tasks={tasksByColumn[col.id] ?? []}
              onOpenTask={handleOpen}
              onAdd={handleAdd}
              onDragStart={handleDragStart}
            />
          </div>
        ))}
      </div>

      <TaskModal
        task={editing}
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(updates) => editing && onTaskUpdate(editing.id, updates)}
        onDelete={() =>
          editing && (onTaskDelete(editing.id), setModalOpen(false))
        }
      />
    </div>
  );
};
