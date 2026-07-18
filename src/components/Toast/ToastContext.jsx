import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Toast.css";

const ToastContext = createContext(null);

const TOAST_DURATION = 2000; // durée d'affichage avant disparition (ms)
const EXIT_DURATION = 250; // durée de l'animation de sortie (doit matcher Toast.css)

/**
 * Une notification individuelle. Composant séparé pour pouvoir déclencher
 * proprement l'animation d'entrée : on monte d'abord l'élément dans son état
 * "caché", puis on bascule vers l'état "visible" au frame suivant, ce qui
 * permet à la transition CSS de s'exécuter (sans ce décalage, l'entrée et la
 * sortie se joueraient au même instant et rien ne s'animerait).
 */
const ToastItem = ({ toast }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const stateClass = toast.leaving ? "toast-leaving" : visible ? "toast-visible" : "toast-hidden";

  return <div className={`toast-item toast-${toast.type} ${stateClass}`}>{toast.text}</div>;
};

/**
 * À placer une seule fois, en haut de l'arbre de composants (ex: dans Game).
 * Fournit `showToast(text, type)` à tous les descendants via useToast().
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]); // [{ id, text, type, leaving }]
  const nextId = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (text, type = "success") => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, text, type, leaving: false }]);

      // Démarre l'animation de sortie après TOAST_DURATION...
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast))
        );
        // ...puis retire complètement le toast une fois l'animation terminée
        setTimeout(() => removeToast(id), EXIT_DURATION);
      }, TOAST_DURATION);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="toast-stack">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

/**
 * Hook à utiliser dans n'importe quel composant enfant de ToastProvider :
 * const { showToast } = useToast();
 * showToast("Objet acheté", "success");
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast doit être utilisé à l'intérieur d'un <ToastProvider>");
  }
  return context;
};