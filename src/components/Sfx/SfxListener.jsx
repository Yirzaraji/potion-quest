import { useEffect } from "react";
import { preloadSfx, unlockSfx, playSfx } from "./SfxManager";

/**
 * Composant sans rendu visuel, a monter UNE SEULE FOIS (dans Game). Il :
 * - precharge tous les bruitages au demarrage,
 * - debloque l'audio a la premiere interaction utilisateur,
 * - pose une delegation d'evenements globale : n'importe quel element de
 *   l'app peut declencher un son au clic gauche, au clic droit ou au survol
 *   simplement en portant un attribut `data-sfx-click`, `data-sfx-rightclick`
 *   ou `data-sfx-hover`, sans avoir a cabler quoi que ce soit dans son propre
 *   composant.
 *
 * Exemple d'utilisation sur n'importe quel element :
 *   <button data-sfx-click="click">...</button>
 *   <div data-sfx-rightclick="click">...</div>
 *   <div data-sfx-hover="hover">...</div>
 */
const SfxListener = () => {
  useEffect(() => {
    preloadSfx();

    const handleFirstInteraction = () => unlockSfx();
    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    const handleClick = (event) => {
      const target = event.target.closest("[data-sfx-click]");
      if (target) playSfx(target.getAttribute("data-sfx-click"));
    };

    const handleRightClick = (event) => {
      const target = event.target.closest("[data-sfx-rightclick]");
      if (target) playSfx(target.getAttribute("data-sfx-rightclick"));
    };

    const handleHover = (event) => {
      const target = event.target.closest("[data-sfx-hover]");
      if (!target) return;

      // event.relatedTarget = l'element d'ou vient la souris. S'il est deja
      // "a l'interieur" de target (ou est target lui-meme), on n'a fait que
      // bouger entre ses enfants -> pas un nouveau survol, on ignore. Sinon,
      // on entre vraiment dans target pour la premiere fois -> on joue le son.
      if (target.contains(event.relatedTarget)) return;

      playSfx(target.getAttribute("data-sfx-hover"));
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return null;
};

export default SfxListener;