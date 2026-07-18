import React, { useState, cloneElement, isValidElement } from "react";
import {
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
} from "@floating-ui/react";
import "./Tooltip.css";

/**
 * Tooltip générique et réutilisable, à brancher sur n'importe quel élément
 * (case d'inventaire, bouton du shop, etc.). S'affiche au survol (et au focus
 * clavier), se repositionne automatiquement pour rester dans l'écran (flip /
 * shift), et se rend dans un portail au niveau du document pour ne jamais
 * être coupé par l'overflow ou le z-index d'une fenêtre modale.
 *
 * Usage :
 * <Tooltip content={<MonContenu />}>
 *   <div>Élément survolé</div>
 * </Tooltip>
 */
const Tooltip = ({ content, children, placement = "top", disabled = false }) => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });

  const hover = useHover(context, { move: false, delay: { open: 150, close: 0 } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // Pas de contenu ou tooltip désactivé -> on rend l'élément tel quel, sans
  // rien accrocher dessus (évite le coût du positionnement pour rien).
  if (disabled || !content || !isValidElement(children)) {
    return children ?? null;
  }

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: refs.setReference, ...children.props })
      )}
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="app-tooltip"
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;