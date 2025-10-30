import { useCallback, useRef, useState } from "react";

export const useDragAndDrop = () => {
  const [drag, setDrag] = useState({ draggingId: null, originColumn: null, index: null, y: null });
  const ghostRef = useRef(null);

  const startDrag = useCallback((taskId, originColumn, index, clientY) => {
    setDrag({ draggingId: taskId, originColumn, index, y: clientY });
  }, []);

  const updateDrag = useCallback((clientY) => {
    setDrag(d => ({ ...d, y: clientY }));
  }, []);

  const endDrag = useCallback(() => {
    setDrag({ draggingId: null, originColumn: null, index: null, y: null });
  }, []);

  return { drag, startDrag, updateDrag, endDrag, ghostRef };
};
