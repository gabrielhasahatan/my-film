"use client";

import { useEffect } from "react";

export default function AntiInspect() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handler);
    document.addEventListener('contextmenu', e => e.preventDefault());
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return null;
}
