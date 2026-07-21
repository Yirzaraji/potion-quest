import { useEffect } from "react";
import { preloadSfx, unlockSfx, playSfx } from "./SfxManager";

/**
 * Composant sans rendu visuel, a monter UNE SEULE FOIS (dans Game). Il :
 * - precharge tous les bruitages au demarrage,
 * - debloque l'audio a la premiere interaction utilisateur,
 * - pose une delegation d'evenements globale : n'importe quel element de
 *   l'app peut declencher un son au clic ou au survol simplement en portant
 *   un attribut `data-sfx-click="nom-du-son"` ou `data-sfx-hover="nom-du-son"`,
 *   sans avoir a cabler quoi que ce soit dans son propre composant.
 *
 * Exemple d'utilisation sur n'importe quel element :
 *   <button data-sfx-click="click">...</button>
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

    const handleHover = (event) => {
      const target = event.target.closest("[data-sfx-hover]");
      if (target) playSfx(target.getAttribute("data-sfx-hover"));
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return null;
};

export default SfxListener;