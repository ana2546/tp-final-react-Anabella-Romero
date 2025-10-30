// src/pages/Pokemon.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface PokemonType {
  type: { name: string };
}

interface PokemonAbility {
  ability: { name: string };
}

interface PokemonDetail {
  name: string;
  height: number; // en decímetros
  weight: number; // en hectogramos
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: { front_default: string };
    };
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
}

const Pokemon: React.FC = () => {
  const { nombre } = useParams<{ nombre: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!nombre) return;

    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${nombre}`
        );
        if (!response.ok) throw new Error("Pokémon no encontrado");
        const data: PokemonDetail = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [nombre]);

  if (loading)
    return <h3 className="text-center mt-5">Cargando detalles...</h3>;
  if (!pokemon)
    return <h3 className="text-center mt-5">Pokémon no encontrado 😢</h3>;

  // Escoge la mejor imagen disponible
  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="container text-center">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <h1 className="text-capitalize mb-4">{pokemon.name}</h1>
      <img
        src={image}
        alt={pokemon.name}
        style={{ width: "200px", height: "200px" }}
        className="mb-3"
      />

      <div className="card mx-auto shadow-sm" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <p>
            <strong>Peso:</strong> {pokemon.weight / 10} kg
          </p>
          <p>
            <strong>Altura:</strong> {pokemon.height / 10} m
          </p>
          <p>
            <strong>Tipo:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
          <p>
            <strong>Habilidades:</strong>{" "}
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
