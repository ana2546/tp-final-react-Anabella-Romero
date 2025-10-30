import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ApiPokemonItem {
  name: string;
  url: string;
}

interface ApiResponse {
  results: ApiPokemonItem[];
}

interface Pokemon {
  name: string;
  url: string;
  image: string;
}

const ListaPokemones: React.FC = () => {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemones = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if (!response.ok) throw new Error("Error en la petición");

        const data: ApiResponse = await response.json();

        const pokemonesConImagen: Pokemon[] = data.results.map((pokemon) => {
          const parts = pokemon.url.split("/").filter(Boolean);
          const id = parts[parts.length - 1];
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          return { ...pokemon, image };
        });

        setPokemones(pokemonesConImagen);
      } catch (error) {
        console.error("Error al obtener los Pokemones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemones();
  }, []);

  if (loading) return <h3 className="text-center mt-5">Cargando Pokemones...</h3>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Pokemones</h1>

      <div className="row">
        {pokemones.map((pokemon) => (
          <div
            key={pokemon.name}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="card text-center shadow-sm p-3">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="card-img-top mx-auto"
                style={{ width: "120px", height: "120px" }}
              />
              <div className="card-body">
                <h5 className="card-title text-capitalize">{pokemon.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPokemones;

