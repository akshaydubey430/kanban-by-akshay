import React, { useEffect } from "react";

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-modal max-w-xl w-full p-4">
        {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
        <div>{children}</div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded bg-neutral-100">Close</button>
        </div>
      </div>
    </div>
  );
};
