import { useCallback, useState } from "react";
import { moveBetween } from "../utils/task.utils";

export const useKanbanBoard = (initialColumns, initialTasks) => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);

  const onTaskMove = useCallback((taskId, fromColumnId, toColumnId, newIndex) => {
    setColumns(prev => {
      const srcIndex = prev.findIndex(c => c.id === fromColumnId);
      const dstIndex = prev.findIndex(c => c.id === toColumnId);
      if (srcIndex === -1 || dstIndex === -1) return prev;

      const src = prev[srcIndex];
      const dst = prev[dstIndex];

      const { source: newSrcList, destination: newDstList } = moveBetween(src.taskIds, dst.taskIds, src.taskIds.indexOf(taskId), newIndex);

      const newCols = prev.slice();
      newCols[srcIndex] = { ...src, taskIds: newSrcList };
      newCols[dstIndex] = { ...dst, taskIds: newDstList };
      return newCols;
    });

    setTasks(prev => ({ ...prev, [taskId]: { ...prev[taskId], status: toColumnId } }));
  }, []);

  const onTaskCreate = useCallback((columnId, task) => {
    setTasks(prev => ({ ...prev, [task.id]: task }));
    setColumns(prev => prev.map(c => (c.id === columnId ? { ...c, taskIds: [...c.taskIds, task.id] } : c)));
  }, []);

  const onTaskUpdate = useCallback((taskId, updates) => {
    setTasks(prev => ({ ...prev, [taskId]: { ...prev[taskId], ...updates } }));
  }, []);

  const onTaskDelete = useCallback((taskId) => {
    setTasks(prev => {
      const copy = { ...prev };
      delete copy[taskId];
      return copy;
    });
    setColumns(prev => prev.map(c => ({ ...c, taskIds: c.taskIds.filter(id => id !== taskId) })));
  }, []);

  return {
    columns,
    tasks,
    setColumns,
    setTasks,
    onTaskMove,
    onTaskCreate,
    onTaskUpdate,
    onTaskDelete
  };
};
