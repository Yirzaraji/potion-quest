import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  // L'état dynamique du joueur
  const [player, setPlayer] = useState({
    level: 1,
    chapter: 1,
    questId: 1,
  });

  return (
    <GameContext.Provider value={{ player }}>
      {children}
    </GameContext.Provider>
  );
}

// Hook personnalisé pour consommer le contexte facilement
export const useGame = () => useContext(GameContext);