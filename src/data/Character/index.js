import { GiWizardStaff, GiOakLeaf, GiBatWing } from "react-icons/gi";
import mageAvatar from "@/assets/mage2.png";
import druideAvatar from "@/assets/druide.png";
import sorcierAvatar from "@/assets/sorcier.png";

// classe -> une seule source pour toute l'application, evite que differents
// composants finissent par utiliser des visuels differents pour une meme
// classe
const Character = [
  {
    id: 0,
    name: "Mage",
    description:
      "Les mages sont les érudits de l'arcane, les maîtres incontestés des mystères magiques. Plongés dans des siècles de savoir et de tradition, ils sont les gardiens des secrets les plus profonds de l'univers. En tant que mage, vous serez un architecte de l'énergie pure, capable de manipuler la réalité elle-même. Vos potions seront des merveilles d'ingéniosité, amplifiant les capacités magiques, érigeant des boucliers invincibles et ouvrant des portails vers des dimensions inconnues.",
    color: "#4f8fe0",
    icon: GiWizardStaff,
    avatar: mageAvatar,
  },
  {
    id: 1,
    name: "Druide",
    description:
      "Les druides sont les gardiens de la nature, les protecteurs silencieux des forêts et des rivières, en communion avec chaque feuille, chaque animal et chaque brise. Leur magie est celle de la vie elle-même, un hymne à la beauté et à l'équilibre de la Terre. En tant que druide, vos potions seront des élixirs de guérison pure, des breuvages de croissance qui transforment les déserts en jardins luxuriants et des potions de transformation qui vous permettront de devenir un avec la nature.",
    color: "#5fae56",
    icon: GiOakLeaf,
    avatar: druideAvatar,
  },
  {
    id: 2,
    name: "Sorcier",
    description:
      "Les sorciers sont les tisseurs de ténèbres, les explorateurs des royaumes oubliés et des ombres profondes. Avec une connaissance intime des forces occultes, ils marchent sur le fil du rasoir entre la lumière et l'obscurité. En tant que sorcier, vos potions seront des distillations de l'âme même de la nuit, des élixirs de nécromancie qui réveillent les morts, des breuvages d'invisibilité qui permettent de se fondre dans les ombres et des potions de contrôle mental qui peuvent plier les volontés à votre commandement.",
    color: "#a13ad1",
    icon: GiBatWing,
    avatar: sorcierAvatar,
  },
];

export default Character;