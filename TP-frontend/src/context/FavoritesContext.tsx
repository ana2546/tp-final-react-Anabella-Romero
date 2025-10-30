import React, { createContext, useState, useEffect } from "react";

interface FavoritePokemon {
  name: string;
  image: string;
}

interface FavoritesContextType {
  favorites: FavoritePokemon[];
  toggleFavorite: (pokemon: FavoritePokemon) => void;
  isFavorite: (name: string) => boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon: FavoritePokemon) => {
    setFavorites((prev) => {
      const isAlreadyFav = prev.some((p) => p.name === pokemon.name);
      return isAlreadyFav
        ? prev.filter((p) => p.name !== pokemon.name)
        : [...prev, pokemon];
    });
  };

  const isFavorite = (name: string) => favorites.some((p) => p.name === name);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
