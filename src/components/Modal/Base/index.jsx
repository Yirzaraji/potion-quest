import { Fragment, useState, useRef, useCallback, useEffect } from "react";
import { FaBook } from "react-icons/fa6";
import "./Base.css";

const Base = ({
  name,
  children,
  width,
  className = "modal shop-modal p-4 rounded-lg shadow",
  defaultPosition = { x: 100, y: 80 },
  zIndex = 1,
  onClose,
  onFocus,
  icon = <FaBook className="text-4xl" />,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const dragState = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

  const handlePointerMove = useCallback((event) => {
    if (!dragState.current.dragging) return;
    setPosition({
      x: event.clientX - dragState.current.offsetX,
      y: event.clientY - dragState.current.offsetY,
    });
  }, []);

  const handlePointerUp = useCallback((event) => {
    dragState.current.dragging = false;
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
  }, [handlePointerMove]);

  const handleHeaderPointerDown = (event) => {
    // Seul le clic gauche declenche le deplacement a la souris ;
    // le tactile (touch) et le stylet (pen) n'ont pas de notion de "bouton"
    // equivalente, donc on ne filtre que pour le type "mouse".
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
    // Nettoyage des listeners si le composant est demonte en plein drag
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <Fragment>
      <div
        className={`${className} modal-window `}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          zIndex,
          ...(width ? { width } : {}),
        }}
        onPointerDown={() => onFocus && onFocus()}
      >
        <div className="modal-topbar"></div>
        <div className="modal-content">
          <div
            className="modal-header mb-2 flex justify-between items-center border-b border-gray-600 cursor-move"
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