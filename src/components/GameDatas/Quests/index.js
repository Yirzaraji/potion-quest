// Liste plate et linéaire de toutes les quêtes du jeu.
// C'est une donnée STATIQUE (le catalogue de contenu écrit par toi), à ne
// jamais muter directement (ex: GAME_QUESTS[0].xxx = ...). L'état de
// progression du joueur (quelle quête est acceptée/rendue) doit vivre
// ailleurs, dans le state React de Game.jsx, initialisé à partir de cette
// liste — jamais écrit dans ce fichier.

// Les 3 états de progression possibles pour une quête, du point de vue du
// joueur. Ces valeurs ne sont PAS stockées ici (voir note ci-dessus) : cette
// constante existe juste pour que tout le code utilise les mêmes chaînes,
// plutôt que de les réécrire à la main à chaque endroit.
export const QUEST_STATUS = {
  NOT_STARTED: "NOT_STARTED", // quête visible mais pas encore acceptée
  ACCEPTED: "ACCEPTED",       // quête acceptée, en cours de réalisation
  COMPLETED: "COMPLETED",     // quête rendue, récompense obtenue
};

export const GAME_QUESTS = [
  // ================= CHAPITRE I =================
  {
    id: 1,
    chapter: 1,
    chapterTitle: "Chapitre I",
    chapterSubtitle: "Les Doléances du Royaume",
    title: "La Blessure du Roi",
    description: "Le roi Arthur a été blessé lors d'une bataille contre les Saxons. Sa blessure refuse de guérir malgré les efforts de Merlin. Désespéré, Arthur envoie un messager à votre boutique pour demander une potion de guérison. Le roi a besoin de cette potion pour se remettre sur pied et continuer à protéger Camelot. Préparez une potion puissante en utilisant des herbes rares et des écailles de dragon pour accélérer sa guérison.",
    questGiver: {
      name: "Messager d'Arthur",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 101, name: "Potion de soin puissante", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 2,
      xp: 300,
      gold: 150
    }
  },
  {
    id: 2,
    chapter: 1,
    chapterTitle: "Chapitre I",
    chapterSubtitle: "Les Doléances du Royaume",
    title: "Le Cœur de la Belle Eloïse",
    description: "Le jeune paysan Tom est amoureux de la belle Eloïse, mais elle ne lui prête aucune attention. Timide et maladroit, Tom a désespérément besoin d'un filtre d'amour pour gagner son cœur. Il se tourne vers vous, l'alchimiste renommé, pour préparer une potion qui fera fondre le cœur de sa bien-aimée. Utilisez des pétales de rose enchantés et un soupçon de miel de fée pour concocter cet élixir.",
    questGiver: {
      name: "Tom le Paysan",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 102, name: "Filtre d'amour", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 3,
      xp: 150,
      gold: 50
    }
  },
  {
    id: 3,
    chapter: 1,
    chapterTitle: "Chapitre I",
    chapterSubtitle: "Les Doléances du Royaume",
    title: "Le Tournoi de Camelot",
    description: "Un grand tournoi se prépare à Camelot, et le chevalier Lancelot veut être au sommet de sa forme pour affronter ses adversaires. Bien que déjà extrêmement fort, il désire une potion qui lui donnera un avantage supplémentaire. Préparez une potion de force à base de griffes de griffon et de racine de mandragore pour l'aider à triompher dans les épreuves.",
    questGiver: {
      name: "Chevalier Lancelot",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 103, name: "Potion de force", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 4, // Transition transparente vers le Chapitre II
      xp: 450,
      gold: 250
    }
  },

  // ================= CHAPITRE II =================
  {
    id: 4,
    chapter: 2,
    chapterTitle: "Chapitre II",
    chapterSubtitle: "L'Ombre et la Magie",
    title: "Le Poison Mystérieux",
    description: "La reine Guenièvre a été empoisonnée lors d'un banquet. Personne ne sait qui est derrière cet acte ignoble, mais le temps presse. Le roi Arthur vous demande de concocter un antidote puissant pour sauver sa reine. Vous devrez mélanger des ingrédients rares tels que le venin de serpent royal et des feuilles de mandragore purifiées.",
    questGiver: {
      name: "Roi Arthur",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 104, name: "Antidote Royal", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 5,
      xp: 600,
      gold: 400
    }
  },
  {
    id: 5,
    chapter: 2,
    chapterTitle: "Chapitre II",
    chapterSubtitle: "L'Ombre et la Magie",
    title: "L'Enigme d'Avalon",
    description: "Merlin, l'enchanteur légendaire, a besoin de vos compétences. Il doit résoudre une énigme ancienne pour accéder à Avalon, mais son esprit est embrouillé. Il demande une potion de clarté pour aiguiser ses pensées. Préparez une potion à base de larmes de licorne et de poudre de cristal lunaire pour aider Merlin à retrouver toute sa lucidité.",
    questGiver: {
      name: "Merlin l'Enchanteur",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 105, name: "Potion de clarté", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 6,
      xp: 500,
      gold: 300
    }
  },
  {
    id: 6,
    chapter: 2,
    chapterTitle: "Chapitre II",
    chapterSubtitle: "L'Ombre et la Magie",
    title: "L'Espionnage à Camelot",
    description: "Morgane, demi-sœur d'Arthur et magicienne puissante, a besoin d'une potion d'invisibilité pour infiltrer Camelot sans être vue. Bien que ses intentions soient douteuses, elle offre une récompense généreuse pour vos services. Concoctez une potion utilisant des ombres de minuit et de l'essence de brume.",
    questGiver: {
      name: "Morgane la Fée",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 106, name: "Potion d'invisibilité", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 7, // Transition vers le Chapitre III
      xp: 700,
      gold: 500
    }
  },

  // ================= CHAPITRE III =================
  {
    id: 7,
    chapter: 3,
    chapterTitle: "Chapitre III",
    chapterSubtitle: "La Quête des Vertus",
    title: "La Quête du Graal",
    description: "Le chevalier Perceval est en quête du Saint Graal, mais il se sent indigne et doute de ses capacités. Il cherche un élixir de sagesse pour lui donner la perspicacité nécessaire pour réussir sa mission sacrée. Préparez un élixir avec des feuilles de laurier sacré et des gouttes d'eau de source pure.",
    questGiver: {
      name: "Chevalier Perceval",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 107, name: "Élixir de sagesse", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 8,
      xp: 800,
      gold: 600
    }
  },
  {
    id: 8,
    chapter: 3,
    chapterTitle: "Chapitre III",
    chapterSubtitle: "La Quête des Vertus",
    title: "Le Défi du Dragon",
    description: "Le chevalier Gauvain doit affronter un dragon redoutable qui terrorise un village voisin. Bien qu'il soit déjà courageux, il désire une potion de bravoure pour renforcer son cœur et affronter le monstre sans peur. Utilisez des plumes de phénix et des cendres volcaniques pour préparer cette potion.",
    questGiver: {
      name: "Chevalier Gauvain",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 108, name: "Potion de bravoure", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 9,
      xp: 900,
      gold: 750
    }
  },
  {
    id: 9,
    chapter: 3,
    chapterTitle: "Chapitre III",
    chapterSubtitle: "La Quête des Vertus",
    title: "Le Mystère des Runes",
    description: "Taliesin, le grand druide et barde, est aux prises avec un mystère entourant des runes anciennes. Pour déchiffrer les secrets cachés, il demande une potion de vérité. Préparez une potion à base de fleurs de vérité et de perles de sagesse pour aider Taliesin à révéler les secrets des runes.",
    questGiver: {
      name: "Taliesin le Druide",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 109, name: "Potion de vérité", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 10, // Transition vers le Chapitre IV
      xp: 1000,
      gold: 900
    }
  },

  // ================= CHAPITRE IV =================
  {
    id: 10,
    chapter: 4,
    chapterTitle: "Chapitre IV",
    chapterSubtitle: "Destins Croisés",
    title: "L'Héritier des Terres du Nord",
    description: "Le chef de clan Bredon et sa femme désirent un enfant depuis des années, mais sans succès. Ils espèrent qu'une potion de fécondité pourrait les aider à concevoir un héritier pour leur clan. Utilisez des racines de vie et des baies d'éternité pour créer une potion qui réalisera leur rêve de famille.",
    questGiver: {
      name: "Chef Bredon",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 110, name: "Potion de fécondité", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 11,
      xp: 1200,
      gold: 1000
    }
  },
  {
    id: 11,
    chapter: 4,
    chapterTitle: "Chapitre IV",
    chapterSubtitle: "Destins Croisés",
    title: "L'Élixir du Courage de Perceval",
    description: "Perceval, chevalier aussi brave qu'ingénu, s'est porté volontaire pour affronter un dragon. Problème : il s'évanouit dès qu'il voit une flamme. Il te commande un élixir du courage pour dompter sa peur. Il insiste : « Pas trop fort ! » — la dernière potion qu'il a essayée l'a fait charger une vache en hurlant “Graal !”. Il faudra un équilibre parfait entre vigueur et raison… une alchimie délicate !",
    questGiver: {
      name: "Chevalier Perceval",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 111, name: "Élixir du courage stable", quantity: 1 }
    ],
    rewards: {
      nextQuestId: 12,
      xp: 1300,
      gold: 1100
    }
  },
  {
    id: 12,
    chapter: 4,
    chapterTitle: "Chapitre IV",
    chapterSubtitle: "Destins Croisés",
    title: "Merlin et le Contre-Sort",
    description: "Merlin, encore lui, a renversé une potion de métamorphose sur son hibou, qui parle désormais en vers et refuse de dormir. Il te demande un contre-élixir de stabilisation magique, mais sans en avertir Arthur, qui croit que le hibou est un démon. Ta réputation d'alchimiste pourrait bien en dépendre…",
    questGiver: {
      name: "Merlin l'Enchanteur",
      avatarUrl: "/images/yoda.jpg"
    },
    objectives: [
      { itemId: 112, name: "Contre-élixir de stabilisation", quantity: 1 }
    ],
    rewards: {
      nextQuestId: null, // dernière quête actuelle du jeu
      xp: 1500,
      gold: 1500
    }
  }
];