import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { createPortal } from "react-dom";
import "./Toast.css";

const ToastItem = ({ toast }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const stateClass = toast.leaving ? "toast-leaving" : visible ? "toast-visible" : "toast-hidden";
  return <div className={`toast-item toast-${toast.type} ${stateClass}`}>{toast.text}</div>;
};

export const ToastStack = () => {
  const { toasts } = useToast();

  return createPortal(
    <div className="toast-stack">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body
  );
};