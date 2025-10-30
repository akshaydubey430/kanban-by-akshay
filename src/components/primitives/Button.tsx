import React from "react";

export const Button = ({ variant = "primary", children, ...rest }) => {
  const base =
    "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-1 shadow-sm";
  const cls =
    variant === "primary"
      ? `${base} bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]`
      : `${base} bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:scale-[0.98]`;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};
