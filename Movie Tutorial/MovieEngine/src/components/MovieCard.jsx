import "../css/MovieCard.css"
import { useMovieContext } from "../context/MovieContext"


function MovieCard({ movie }) { //movie is a property about movie (name, year etc) as object

    // this is used to use all the context/state from the provider from the values{} in the provider
    const { isFavorite, addtoFavorites, removeFromFavorites } = useMovieContext()

    const favorite = isFavorite(movie.id)

    function onFavouriteClick(e) {
        // alert('Clicked')
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addtoFavorites(movie)
    }

    return (
        //className is used to use stylesheets in JSX
        <div className="movie-card">
            <div className="movie-poster">
                {/* using the prop here */}
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    {/* using the onclick JS function to call a function on an event */}
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavouriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                {/* using the prop here again */}
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard