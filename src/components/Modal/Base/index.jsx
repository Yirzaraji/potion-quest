import { Fragment, useState, useRef, useCallback, useEffect } from "react";
import { FaBook } from "react-icons/fa6";
import "./Base.css";

const Base = ({
  name,
  children,
  width,
  className = "modal tw-modal shop-modal p-4 rounded-lg shadow",
  defaultPosition = { x: 100, y: 80 },
  zIndex = 1,
  onClose,
  onFocus,
  icon = <FaBook className="text-4xl" />,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const modalRef = useRef(null);
  const dragState = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

  // 🎯 Recentre parfaitement la modale en fonction de sa taille réelle
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Est-ce un petit écran OU un mobile en paysage (hauteur faible ou largeur < 1024) ?
    const isMobileOrLandscape = 
      window.innerWidth < 640 || 
      window.innerHeight < 500 || 
      (window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 1024);

    if (isMobileOrLandscape) {
      const modalWidth = modalRef.current ? modalRef.current.offsetWidth : 320;
      const centeredX = Math.max(10, (window.innerWidth - modalWidth) / 2);
      // En paysage, 10px du haut suffit pour ne pas dépasser vers le bas
      const topY = window.innerHeight < 500 ? 10 : 20;

      setPosition({
        x: centeredX,
        y: topY,
      });
    } else {
      setPosition(defaultPosition);
    }
  }, [defaultPosition.x, defaultPosition.y]);

  const handlePointerMove = useCallback((event) => {
    if (!dragState.current.dragging) return;
    setPosition({
      x: event.clientX - dragState.current.offsetX,
      y: event.clientY - dragState.current.offsetY,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    dragState.current.dragging = false;
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
  }, [handlePointerMove]);

  const handleHeaderPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    onFocus && onFocus();
    dragState.current = {
      dragging: true,
      offsetX: event.clientX - position.x,
      offsetY: event.clientY - position.y,
    };
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <Fragment>
      <div
        ref={modalRef}
        className={`${className} modal-window`}
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex,
          ...(width ? { width } : {}),
        }}
        onPointerDown={() => onFocus && onFocus()}
      >
        <div className="modal-topbar"></div>
        <div className="modal-content">
          <div
            className="modal-header mb-2 flex justify-between items-center border-b border-gray-600 cursor-move touch-none"
            onPointerDown={handleHeaderPointerDown}
          >
            <h5 className="modal-title text-lg font-bold text-left">
              <span className="inline-flex gap-2 items-center">
                {icon}
                <span className="self-end">{name}</span>
              </span>
            </h5>
            <button
              type="button"
              className="modal-close-btn"
              aria-label="Fermer"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                onClose && onClose();
              }}
            >
              ×
            </button>
          </div>
          <div className="modal-body mt-4 text-left">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Base;