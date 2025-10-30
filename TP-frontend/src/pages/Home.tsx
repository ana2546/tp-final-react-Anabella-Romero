import { useFavorites } from "../hooks/useFavorites";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="container text-center">
      <h1 className="mb-4">Favoritos ❤️</h1>

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
