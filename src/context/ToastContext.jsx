import React, { createContext, useState, useRef, useCallback } from "react";

const ToastContext = createContext(null);

const TOAST_DURATION = 2000; // Durée d'affichage (ms)
const EXIT_DURATION = 250;   // Durée de l'animation de sortie (ms)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (text, type = "success") => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, text, type, leaving: false }]);

      // Démarre l'animation de sortie après TOAST_DURATION
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast))
        );
        // Retire le toast après l'animation de sortie
        setTimeout(() => removeToast(id), EXIT_DURATION);
      }, TOAST_DURATION);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Export du Context pour le hook
export { ToastContext };