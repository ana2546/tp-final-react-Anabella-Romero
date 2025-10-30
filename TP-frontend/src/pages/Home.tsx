import { useFavorites } from "../hooks/useFavorites";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home: React.FC = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="container text-center">
      <div className="container1 mt-5">
        <div className="text-center bg-light p-4 rounded shadow">
          <h1 className="fw-bold text-dark mb-3">Pokédex React</h1>

          <p className="lead text-secondary">
            Este proyecto muestra una lista de Pokémon obtenida desde la{" "}
            <a
              href="https://pokeapi.co/api/v2/pokemon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none fw-semibold"
            >
              PokeAPI
            </a>
            , con información básica y detallada de cada uno. El mismo cuenta
            con 3 Pages, la actual que es donde se explica la finalidad del
            proyecto y la sección de Favoritos❤️.En la page "Lista de Pokemones"
            vas a poder apreciar todos los pokemones, agregar a la lista de
            favoritos a los que prefieras y hacer búsqueda de alguno en
            especial, al hacer click en cualquier pokemon de la pagina vas a
            poder aprecias mas caracteristicas especificas del mismo. Espero la
            PokéAPP sea de tu agrado 😄.
          </p>

          <p className="text-secondary mb-3">
            Desarrollado utilizando <strong>React</strong>,{" "}
            <strong>Vite</strong>, <strong>Bootstrap</strong> y{" "}
            <strong>React Router</strong>.
          </p>

          <p className="text-secondary">
            Este trabajo fue realizado como proyecto final del{" "}
            <strong>curso de Programación Frontend</strong>.
          </p>
        </div>
      </div>

      <h1 className="fav mb-4 bg-dark text-white p-3 rounded shadow">
        Favoritos ❤️
      </h1>

      {favorites.length === 0 ? (
        <p>No hay Pokémon en favoritos todavía.</p>
      ) : (
        <div className="row">
          {favorites.map((pokemon) => (
            <div key={pokemon.name} className="col-md-3 mb-4">
              <div
                className="card text-center shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/pokemon/${pokemon.name}`)}
              >
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="card-img-top mx-auto mt-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{pokemon.name}</h5>
                  <button
                    className="btn btn-outline-danger rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      padding: 0,
                      fontSize: "1.2rem",
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // ⚡ Detiene el click de la card
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
      )}
    </div>
  );
};

export default Home;
