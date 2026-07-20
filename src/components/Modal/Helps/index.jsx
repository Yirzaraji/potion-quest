import React, { Fragment } from "react";
import "./Helps.css";

const Helps = () => {
  // Lecture defensive : on evite un plantage si le joueur arrive ici sans
  // avoir encore de donnees enregistrees dans le localStorage.
  let pseudo = null;
  try {
    const userDatas = JSON.parse(localStorage.getItem("userDatas"));
    pseudo = userDatas?.pseudo || null;
  } catch {
    pseudo = null;
  }

  return (
    <Fragment>
      <div className="helps-container overflow-y-auto max-h-[540px] text-white">
        <section className="helps-section">
          <h4 className="helps-title uppercase border-b border-gray-600 mb-2 w-full">
            Bienvenue, <span className="helps-pseudo-player">{pseudo ? ` ${pseudo}` : ""}</span>
          </h4>
          <p className="helps-text text-justify">
            Bienvenue sur Potion Quest, un jeu de craft de potions magiques. Vous
            incarnez un mage, un druide ou un sorcier, ce qui vous donne des
            aptitudes hors du commun pour la confection de breuvages. Cette
            section regroupe tout ce qu'il faut savoir sur le fonctionnement de
            l'interface pour avancer sereinement dans votre aventure.
          </p>
        </section>

        <section className="helps-section">
          <h4 className="helps-title uppercase border-b border-gray-600 mb-2 w-full">
            Comment progresser
          </h4>
          <ol className="helps-steps">
            <li>
              Ouvrez le module <strong>Quetes</strong> (barre de navigation a
              droite de l'ecran) et acceptez la premiere quete disponible. Une
              nouvelle quete se debloque a chaque fois que vous en terminez une.
            </li>
            <li>
              Rendez-vous dans le module <strong>Recettes</strong> pour trouver
              la potion demandee par la quete. Cliquez dessus pour consulter les
              ingredients requis et la methode de fabrication.
            </li>
            <li>
              Le bouton <strong>Suivre</strong> fait apparaitre un petit
              pense-bete sur le cote gauche de l'ecran, pratique pour garder les
              ingredients sous les yeux pendant la manipulation du chaudron.
            </li>
            <li>
              Achetez les ingredients manquants dans le module{" "}
              <strong>Shop</strong> (clic droit sur un objet pour l'acheter avec
              votre or). Ils rejoignent directement votre inventaire.
            </li>
            <li>
              Depuis l'<strong>Inventaire</strong>, vous pouvez a tout moment
              consulter votre or et revendre un objet au shop d'un clic droit
              dessus.
            </li>
            <li>
              Une fois les ingredients reunis, direction le chaudron pour
              fabriquer la potion (voir "Fabriquer une potion" ci-dessous).
            </li>
            <li>
              Une fois la potion obtenue, ouvrez le module Quetes, deposez la
              potion dans la zone prevue a cet effet et validez pour terminer la
              quete. Une nouvelle quete se debloque aussitot.
            </li>
          </ol>
        </section>

        <section className="helps-tip">
          <h5 className="uppercase">Astuce - Plus d'argent ?</h5>
          <p className="text-justify">
            Si votre bourse est vide, achetez un flacon vide et quelques roses
            au shop pour fabriquer un filtre d'amour, revendable 150 pieces
            d'or. De quoi repartir sur de bonnes bases.
          </p>
        </section>

        <section className="helps-section">
          <h4 className="helps-title uppercase border-b border-gray-600 mb-2 w-full">
            Fabriquer une potion
          </h4>
          <p className="helps-text text-justify">
            Le coeur du jeu repose sur un systeme de fabrication en
            glisser-deposer (drag and drop), pense pour rester simple et
            intuitif. Besoin de broyer une herbe ? Faites-la glisser depuis
            votre inventaire vers le receptacle prevu a cet effet, a cote du
            chaudron : elle sera transformee en poudre, a recuperer ensuite
            dans votre inventaire. Besoin d'eau ou de vin dans le chaudron ?
            Glissez simplement l'objet dans le chaudron, puis faites bouillir a
            l'aide du bouton prevu a cet effet. Une fois tous les ingredients
            reunis et l'eau portee a ebullition, le jeu vous confirme si la
            preparation est reussie. En cas d'echec, tout est perdu et il faut
            recommencer, sauf si un flacon vide vous est rendu.
          </p>
        </section>

        <section className="helps-section">
          <h4 className="helps-title uppercase border-b border-gray-600 mb-2 w-full">
            Votre profil
          </h4>
          <p className="helps-text text-justify">
            Le module Profil vous permet de suivre la progression de votre
            personnage : son niveau et son avancement a travers les chapitres
            de l'histoire.
          </p>
        </section>

        <section className="helps-section helps-section-last">
          <h4 className="helps-title uppercase border-b border-gray-600 mb-2 w-full">
            Description des fenetres
          </h4>
          <ul className="helps-window-list">
            <li>
              <strong>Shop</strong> — achetez des ingredients et des potions
              avec votre or (clic droit sur un objet pour l'acheter).
            </li>
            <li>
              <strong>Inventaire</strong> — consultez vos objets et votre or,
              revendez un objet au shop (clic droit dessus).
            </li>
            <li>
              <strong>Recettes</strong> — consultez la liste des potions, leurs
              ingredients et leur methode de fabrication.
            </li>
            <li>
              <strong>Quetes</strong> — acceptez, suivez et rendez vos quetes
              chapitre par chapitre.
            </li>
            <li>
              <strong>Profil</strong> — suivez votre niveau et votre
              progression dans l'histoire.
            </li>
          </ul>
        </section>
      </div>
    </Fragment>
  );
};

export default Helps;