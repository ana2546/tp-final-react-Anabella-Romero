import React, { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

interface ApiPokemonItem {
  name: string;
  url: string;
}

interface ApiResponse {
  results: ApiPokemonItem[];
  next: string | null;
  previous: string | null;
}

interface Pokemon {
  name: string;
  url: string;
  image: string;
}

const ListaPokemones: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { toggleFavorite, isFavorite } = useFavorites();
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0); // control de página
  const [totalPokemones, setTotalPokemones] = useState<number>(0);
  const navigate = useNavigate();
  const limit = 20;
  const isSearchMode = pokemones.length === 1 && search === "";
  const handleReset = () => {
    setSearch(""); // limpia el input
    setOffset(0); // resetea la paginación
    fetchPokemones(0); // recarga los primeros 20 Pokémon
  };

  // 🔹 Función para cargar los Pokémon
  const fetchPokemones = async (currentOffset: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Error en la petición");
      const data: ApiResponse & { count: number } = await response.json();

      setTotalPokemones(data.count); // guardamos total de pokemones

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

  // 🔹 Buscador
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() === "") return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon no encontrado");
        return res.json();
      })
      .then((pokeData) => {
        setPokemones([
          {
            name: pokeData.name,
            image: pokeData.sprites.front_default,
            url: `https://pokeapi.co/api/v2/pokemon/${pokeData.name}`,
          },
        ]);
        setSearch(""); // limpia el input
      })
      .catch(() => alert("Pokémon no encontrado 😢"));
  };

  useEffect(() => {
    fetchPokemones(offset);
  }, [offset]);

  if (loading)
    return <h3 className="text-center mt-5">Cargando Pokemones...</h3>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 bg-dark text-white p-3 rounded shadow">
        Lista de Pokemones
      </h1>

      {/* 🔍 Buscador con botón "Ver todos" */}
      <form
        className="d-flex justify-content-center mb-4"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary me-2">
          Buscar
        </button>
        <button
          type="button"
          className="btn btn-secondary  "
          onClick={handleReset} // vuelve a mostrar los primeros 20
        >
          🔁 Ver todos
        </button>
      </form>
      {!isSearchMode && (
        <Pagination
          offset={offset}
          limit={limit}
          total={totalPokemones}
          onPrevious={() => setOffset((prev) => Math.max(prev - limit, 0))}
          onNext={() => setOffset((prev) => prev + limit)}
        />
      )}
      <div className="row">
        {pokemones.map((pokemon) => (
          <div key={pokemon.name} className="col-md-3 mb-4">
            <div
              className="card text-center shadow-sm position-relative"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="card-img-top mx-auto mt-3"
                style={{ width: "100px", height: "100px" }}
              />
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="card-title text-capitalize mb-0">
                  {pokemon.name}
                </h5>
                <button
                  className="btn btn-outline-danger rounded-circle"
                  style={{
                    width: "40px",
                    height: "40px",
                    padding: 0,
                    fontSize: "1.2rem",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite({
                      name: pokemon.name,
                      image: pokemon.image,
                    });
                  }}
                >
                  {isFavorite(pokemon.name) ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isSearchMode && (
        <Pagination
          offset={offset}
          limit={limit}
          total={totalPokemones}
          onPrevious={() => setOffset((prev) => Math.max(prev - limit, 0))}
          onNext={() => setOffset((prev) => prev + limit)}
        />
      )}
    </div>
  );
};

export default ListaPokemones;
