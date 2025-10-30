import { useFavorites } from "../hooks/useFavorites";

const Home: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container text-center">
      <h1 className="mb-4">Favoritos ❤️</h1>

      {favorites.length === 0 ? (
        <p>No hay Pokémon en favoritos todavía.</p>
      ) : (
        <div className="row">
          {favorites.map((pokemon) => (
            <div key={pokemon.name} className="col-md-3 mb-4">
              <div className="card text-center shadow-sm">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="card-img-top mx-auto mt-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{pokemon.name}</h5>
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
