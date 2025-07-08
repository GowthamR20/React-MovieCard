import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../css/Home.css"

function Home() {
    // Use state uses array notation, the variable and the function that sets the variable. 
    // We can fix a default value in the useState(defaultVal)
    // A state update/change will make the entire component to rerender and to get updated
    const [searchQuery, setSearchQuery] = useState("");

    // this will called everytime the component is rendered. Too much work everytime
    // const movies = getPopularMovies() 

    // use useEffect for such processes (one time operation) 
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null) //usually have a error state for catching and handling
    const [loading, setLoading] = useState(true) // a state to monitor the use effect state

    //A function is called in useEffect if something in [] - dependency array changes - usually a state variable
    // empty [] runs the useEffect only once when rendering the component and not when rerendering as it will not have any dependency
    // useEffect(()=>{},[]) 
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])


    const handleSearch = async (e) => {
        e.preventDefault() //prevents the default action == reload the page on form submit here
        // alert(searchQuery)
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
        setSearchQuery('') //always update the state variable using the function of the state variable.
    }

    return (
        <>
            <div className="home">
                <form onSubmit={handleSearch} className="search-form">
                    <input type="text" placeholder="Search for movies...." className="search-input"
                        // using state here
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)} // updating the state variable from an input element
                    >

                    </input>
                    <button type="submit" className="search-button">Search</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                {loading ? <div className="loading">Loading...</div>
                    : <div className="movies-grid">
                        {/* Iterate the JS variable using .map and then use component MovieCard for every movie in the array */}
                        {/* key is like a unique identifier used for states and interaction reference - KEY IS ADDITIONAL REACT UNDERSTANDS */}
                        {
                            movies.map((movie) => (
                                //conditional rendering based on search query text
                                // if the movie title starts with the searchQuery( state variable) it renders that MovieCard component
                                // movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id} />
                                <MovieCard movie={movie} key={movie.id} />
                            ))
                        }
                    </div>
                }

            </div>
        </>
    )
}

export default Home;