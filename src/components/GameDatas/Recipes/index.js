const recipes = [
    {
      title: "Potion de Vie",
      description: "Soigne blessures & maladies",
      instructions: `Pour concocter cette potion de guérison des plaies, il vous faudra rassembler quelques éléments essentiels : une eau pure et limpide, une rose délicate et un coquelicot réduit en une fine poussière. Lorsque tous les ingrédients seront réunis, suivez les étapes suivantes pour donner vie à votre potion magique. Incorporez délicatement les éléments dans un chaudron ancien, en les disposant avec soin. Laissez mijoter le mélange à une chaleur douce, suffisamment longtemps pour que les arômes se mêlent harmonieusement. Une fois le processus de cuisson terminé, laissez le tout reposer tranquillement. Enfin, pour capturer l'essence magique de votre création, remplissez une fiole vide avec le précieux breuvage.`,
      ingredients: [
        {
          name: "Eau", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Feuillereve", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Pissentit", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion de Lune",
      description: "Appaise l'esprit",
      instructions: `Dans une fiole nacrée repose une liqueur argentée, douce comme la lumière d’un clair de lune. Elle semble vibrer au rythme des marées, émettant une lueur calme et hypnotique. Son parfum évoque la lavande, la menthe glacée et un soupçon de pluie nocturne. Distillée sous la pleine lune, elle ne peut être préparée qu entre minuit et l’aube. Sa base est une eau lunaire, recueillie dans les bassins sacrés des druides. On y infuse des pétales de lys nocturne, qui favorisent le sommeil et la clarté mentale. La feuille de rêvebleue, plante rare des forêts brumeuses, y ajoute une touche d’oubli doux. Une gorgée suffit à ralentir le tumulte intérieur, à dissiper les pensées obsédantes.`,
      ingredients: [
        {
          name: "Eau", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Racine de Mandragore", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Petale de rose", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion de souffle mortel",
      description: "Létale",
      instructions: `Opaque et visqueuse, cette potion semble absorber la lumière. Son odeur est métallique, presque cendreuse, comme un feu éteint. Elle est née dans les laboratoires interdits, loin des regards. L’eau de cendre froide en est la base, chargée de magie destructrice. La bellombre, plante toxique, y distille sa essence létale. Le narcisse noir, rare et funeste, parachève le mélange. Son usage est réservé aux assassins, aux espions, ou aux traîtres. Elle peut être versée dans un verre, ou libérée sous forme de vapeur. Le souffle devient court, le cœur s’emballe, l’esprit s’égare. La victime croit rêver, puis s’effondre dans un silence glacé.`,
      ingredients: [
        {
          name: "Huile", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Feuille de bellombre", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Essence de Noxsombre", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion du Hardi",
      description: "Augmente votre courage",
      instructions: `Translucide avec des reflets rouges et or, elle semble vibrer d’énergie. Elle est chaude au toucher, comme une braise sous la peau. Son parfum est celui du fer, du vent, et de la roche.L’eau de roche foudroyée lui donne sa puissance brute. La racine de griffefer renforce la volonté et la résistance. La flammevive, fleur ardente, stimule le cœur et l’instinct. Une gorgée suffit à faire taire la peur et éveiller l’audace. Les guerriers la boivent avant les batailles désespérées. Elle ne rend pas invincible, mais elle fait oublier le doute. Son effet dure peu, mais marque l’âme pour longtemps. Certains deviennent trop téméraires et y perdent la raison. lle est utilisée dans les rites de passage et les duels d’honneur. les bardes la chantent comme la “liqueur des braves”.`,
      ingredients: [
        {
          name: "Vin", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Dent de Lion", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Fleur ardente", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Elixir d'Amour",
      description: "Vous Rend Irresistible",
      instructions: `Une seule goutte sur les lèvres suffit à troubler les cœurs les plus froids. Mais mal utilisé, il peut provoquer obsession, jalousie ou confusion sentimentale. Son effet est intense mais bref — une heure de passion, puis le retour au réel. Certains l’ajoutent à du vin, d’autres le versent dans une lettre parfumée. Il est interdit dans les mariages royaux, mais toléré dans les bals masqués. On dit qu’il révèle les vérités du cœur, même celles que l’on voulait taire. Les alchimistes le manipulent avec des gants, car il peut troubler même l’esprit le plus rationnel. Et dans les légendes, il aurait causé plus de guerres que de romances.`,
      ingredients: [
        {
          name: "Eau", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Pétale de Rose", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Essence de Jasmin", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion de Vie",
      description: "Soigne blessures & maladies",
      instructions: `Pour concocter cette potion de guérison des plaies, il vous faudra rassembler quelques éléments essentiels : une eau pure et limpide, une rose délicate et un coquelicot réduit en une fine poussière. Lorsque tous les ingrédients seront réunis, suivez les étapes suivantes pour donner vie à votre potion magique. Incorporez délicatement les éléments dans un chaudron ancien, en les disposant avec soin. Laissez mijoter le mélange à une chaleur douce, suffisamment longtemps pour que les arômes se mêlent harmonieusement. Une fois le processus de cuisson terminé, laissez le tout reposer tranquillement. Enfin, pour capturer l'essence magique de votre création, remplissez une fiole vide avec le précieux breuvage.`,
      ingredients: [
        {
          name: "Eau", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Feuillereve", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Pissentit", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion de Lune",
      description: "Appaise l'esprit",
      instructions: `Dans une fiole nacrée repose une liqueur argentée, douce comme la lumière d’un clair de lune. Elle semble vibrer au rythme des marées, émettant une lueur calme et hypnotique. Son parfum évoque la lavande, la menthe glacée et un soupçon de pluie nocturne. Distillée sous la pleine lune, elle ne peut être préparée qu entre minuit et l’aube. Sa base est une eau lunaire, recueillie dans les bassins sacrés des druides. On y infuse des pétales de lys nocturne, qui favorisent le sommeil et la clarté mentale. La feuille de rêvebleue, plante rare des forêts brumeuses, y ajoute une touche d’oubli doux. Une gorgée suffit à ralentir le tumulte intérieur, à dissiper les pensées obsédantes.`,
      ingredients: [
        {
          name: "Eau", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Racine de Mandragore", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Petale de rose", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion de souffle mortel",
      description: "Létale",
      instructions: `Opaque et visqueuse, cette potion semble absorber la lumière. Son odeur est métallique, presque cendreuse, comme un feu éteint. Elle est née dans les laboratoires interdits, loin des regards. L’eau de cendre froide en est la base, chargée de magie destructrice. La bellombre, plante toxique, y distille sa essence létale. Le narcisse noir, rare et funeste, parachève le mélange. Son usage est réservé aux assassins, aux espions, ou aux traîtres. Elle peut être versée dans un verre, ou libérée sous forme de vapeur. Le souffle devient court, le cœur s’emballe, l’esprit s’égare. La victime croit rêver, puis s’effondre dans un silence glacé.`,
      ingredients: [
        {
          name: "Huile", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Feuille de bellombre", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Essence de Noxsombre", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion du Hardi",
      description: "Augmente votre courage",
      instructions: `Translucide avec des reflets rouges et or, elle semble vibrer d’énergie. Elle est chaude au toucher, comme une braise sous la peau. Son parfum est celui du fer, du vent, et de la roche.L’eau de roche foudroyée lui donne sa puissance brute. La racine de griffefer renforce la volonté et la résistance. La flammevive, fleur ardente, stimule le cœur et l’instinct. Une gorgée suffit à faire taire la peur et éveiller l’audace. Les guerriers la boivent avant les batailles désespérées. Elle ne rend pas invincible, mais elle fait oublier le doute. Son effet dure peu, mais marque l’âme pour longtemps. Certains deviennent trop téméraires et y perdent la raison. lle est utilisée dans les rites de passage et les duels d’honneur. les bardes la chantent comme la “liqueur des braves”.`,
      ingredients: [
        {
          name: "Vin", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Dent de Lion", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Fleur ardente", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Elixir d'Amour",
      description: "Vous Rend Irresistible",
      instructions: `Une seule goutte sur les lèvres suffit à troubler les cœurs les plus froids. Mais mal utilisé, il peut provoquer obsession, jalousie ou confusion sentimentale. Son effet est intense mais bref — une heure de passion, puis le retour au réel. Certains l’ajoutent à du vin, d’autres le versent dans une lettre parfumée. Il est interdit dans les mariages royaux, mais toléré dans les bals masqués. On dit qu’il révèle les vérités du cœur, même celles que l’on voulait taire. Les alchimistes le manipulent avec des gants, car il peut troubler même l’esprit le plus rationnel. Et dans les légendes, il aurait causé plus de guerres que de romances.`,
      ingredients: [
        {
          name: "Eau", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Pétale de Rose", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Essence de Jasmin", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion de Vie",
      description: "Soigne blessures & maladies",
      instructions: `Pour concocter cette potion de guérison des plaies, il vous faudra rassembler quelques éléments essentiels : une eau pure et limpide, une rose délicate et un coquelicot réduit en une fine poussière. Lorsque tous les ingrédients seront réunis, suivez les étapes suivantes pour donner vie à votre potion magique. Incorporez délicatement les éléments dans un chaudron ancien, en les disposant avec soin. Laissez mijoter le mélange à une chaleur douce, suffisamment longtemps pour que les arômes se mêlent harmonieusement. Une fois le processus de cuisson terminé, laissez le tout reposer tranquillement. Enfin, pour capturer l'essence magique de votre création, remplissez une fiole vide avec le précieux breuvage.`,
      ingredients: [
        {
          name: "Eau", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Feuillereve", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Pissentit", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion de Lune",
      description: "Appaise l'esprit",
      instructions: `Dans une fiole nacrée repose une liqueur argentée, douce comme la lumière d’un clair de lune. Elle semble vibrer au rythme des marées, émettant une lueur calme et hypnotique. Son parfum évoque la lavande, la menthe glacée et un soupçon de pluie nocturne. Distillée sous la pleine lune, elle ne peut être préparée qu entre minuit et l’aube. Sa base est une eau lunaire, recueillie dans les bassins sacrés des druides. On y infuse des pétales de lys nocturne, qui favorisent le sommeil et la clarté mentale. La feuille de rêvebleue, plante rare des forêts brumeuses, y ajoute une touche d’oubli doux. Une gorgée suffit à ralentir le tumulte intérieur, à dissiper les pensées obsédantes.`,
      ingredients: [
        {
          name: "Eau", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Racine de Mandragore", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Petale de rose", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion de souffle mortel",
      description: "Létale",
      instructions: `Opaque et visqueuse, cette potion semble absorber la lumière. Son odeur est métallique, presque cendreuse, comme un feu éteint. Elle est née dans les laboratoires interdits, loin des regards. L’eau de cendre froide en est la base, chargée de magie destructrice. La bellombre, plante toxique, y distille sa essence létale. Le narcisse noir, rare et funeste, parachève le mélange. Son usage est réservé aux assassins, aux espions, ou aux traîtres. Elle peut être versée dans un verre, ou libérée sous forme de vapeur. Le souffle devient court, le cœur s’emballe, l’esprit s’égare. La victime croit rêver, puis s’effondre dans un silence glacé.`,
      ingredients: [
        {
          name: "Huile", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Feuille de bellombre", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Essence de Noxsombre", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Potion du Hardi",
      description: "Augmente votre courage",
      instructions: `Translucide avec des reflets rouges et or, elle semble vibrer d’énergie. Elle est chaude au toucher, comme une braise sous la peau. Son parfum est celui du fer, du vent, et de la roche.L’eau de roche foudroyée lui donne sa puissance brute. La racine de griffefer renforce la volonté et la résistance. La flammevive, fleur ardente, stimule le cœur et l’instinct. Une gorgée suffit à faire taire la peur et éveiller l’audace. Les guerriers la boivent avant les batailles désespérées. Elle ne rend pas invincible, mais elle fait oublier le doute. Son effet dure peu, mais marque l’âme pour longtemps. Certains deviennent trop téméraires et y perdent la raison. lle est utilisée dans les rites de passage et les duels d’honneur. les bardes la chantent comme la “liqueur des braves”.`,
      ingredients: [
        {
          name: "Vin", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Dent de Lion", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Fleur ardente", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    },
    {
      title: "Elixir d'Amour",
      description: "Vous Rend Irresistible",
      instructions: `Une seule goutte sur les lèvres suffit à troubler les cœurs les plus froids. Mais mal utilisé, il peut provoquer obsession, jalousie ou confusion sentimentale. Son effet est intense mais bref — une heure de passion, puis le retour au réel. Certains l’ajoutent à du vin, d’autres le versent dans une lettre parfumée. Il est interdit dans les mariages royaux, mais toléré dans les bals masqués. On dit qu’il révèle les vérités du cœur, même celles que l’on voulait taire. Les alchimistes le manipulent avec des gants, car il peut troubler même l’esprit le plus rationnel. Et dans les légendes, il aurait causé plus de guerres que de romances.`,
      ingredients: [
        {
          name: "Eau", 
          icon:<GiHealthPotion className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Pétale de Rose", 
          icon:<GiPlantRoots className="text-5xl"/>, 
          quantity:1
        },
        {
          name: "Essence de Jasmin", 
          icon:<GiRose className="text-5xl"/>, 
          quantity:3
        },
      ],
    }
  ];