import React, { Fragment, useState, useRef, useEffect, useCallback } from "react";
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
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const dragState = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

  const handleMouseMove = useCallback((event) => {
    if (!dragState.current.dragging) return;
    setPosition({
      x: event.clientX - dragState.current.offsetX,
      y: event.clientY - dragState.current.offsetY,
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    dragState.current.dragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleHeaderMouseDown = (event) => {
    // Seul le clic gauche déclenche le déplacement
    if (event.button !== 0) return;
    onFocus && onFocus();
    dragState.current = {
      dragging: true,
      offsetX: event.clientX - position.x,
      offsetY: event.clientY - position.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    // Nettoyage des listeners si le composant est démonté en plein drag
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  //JSX RENDER
  return (
    <Fragment>
      <div
        className={`${className} modal-window`}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          zIndex,
          ...(width ? { width } : {}),
        }}
        onMouseDown={() => onFocus && onFocus()}
      >
        <div className="modal-content">
          <div
            className="modal-header mb-5 flex justify-between items-center border-b border-gray-600 cursor-move"
            onMouseDown={handleHeaderMouseDown}
          >
            <h5 className="modal-title text-lg font-bold text-left uppercase">
              <span className="inline-flex gap-2 items-center"> {<FaBook className="text-4xl" />}
                <span className="self-end">{name}</span>
              </span>
            </h5>
            <button
              type="button"
              className="modal-close-btn"
              aria-label="Fermer"
              onMouseDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                onClose && onClose();
              }}
            >
              ✕
            </button>
          </div>
          <div className="modal-body mt-4 text-left">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}; 


export default Base;