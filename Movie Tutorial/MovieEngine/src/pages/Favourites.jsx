import "../css/Favorites.css"
import { useMovieContext } from "../context/MovieContext"
import MovieCard from "../components/MovieCard"

function Favourites() {
    const { favorites } = useMovieContext()

    if (favorites) {
        return <div className="favorites">
            <h2>Your Favourites</h2>
            <div className="movies-grid">
                {/* Iterate the JS variable using .map and then use component MovieCard for every movie in the array */}
                {/* key is like a unique identifier used for states and interaction reference - KEY IS ADDITIONAL REACT UNDERSTANDS */}
                {
                    favorites.map((movie) => (
                        //conditional rendering based on search query text
                        // if the movie title starts with the searchQuery( state variable) it renders that MovieCard component
                        // movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id} />
                        <MovieCard movie={movie} key={movie.id} />
                    ))
                }
            </div>
        </div>
    }


    return <div className="favorites-empty">
        <h2>No favourites movie yet</h2>
        <p>Start adding movie to favourites and they will appear here</p>
    </div>
}
export default Favourites