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
  height: number;
  weight: number;
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
  const { nombre } = useParams<{ nombre?: string }>();
  const navigate = useNavigate();

  const defaultPokemon = "pikachu"; // Pokémon por defecto
  const pokemonName = nombre || defaultPokemon;

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
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
  }, [pokemonName]);

  if (loading)
    return <h3 className="text-center mt-5">Cargando detalles...</h3>;
  if (!pokemon)
    return <h3 className="text-center mt-5">Pokémon no encontrado 😢</h3>;

  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="container text-center">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="card mx-auto shadow-sm" style={{ maxWidth: "400px" }}>
        <h1 className="text-capitalize mb-4">{pokemon.name}</h1>
        <img
          src={image}
          alt={pokemon.name}
          style={{ width: "200px", height: "200px" }}
          className="className=mb-3 mx-auto"
        />
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
