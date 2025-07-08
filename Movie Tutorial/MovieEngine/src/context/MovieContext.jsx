// a context is a state that is global and can be passed between components to be used in different place

import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

// This provider provides state to any of the components that are wrapped around it
// children is a reserved prop when wrting a component
// Children is anything that is inside a component that is rendered
export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem('favorites')
        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addtoFavorites = (movie) => {
        // this is to also have the previous value and add the new value
        setFavorites(prev => [...prev, movie])
    }
    const removeFromFavorites = (movieId) => {
        // this is to also have the previous value and add the new value
        // only cretating an array with the condition
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }
    //values to be used in context/provider
    const values = {
        favorites,
        addtoFavorites,
        removeFromFavorites,
        isFavorite
    }
    // value is a prop that takes the values and pass it to the children using provider
    // its like passing all the state you need to the compoennets
    return <MovieContext.Provider value={values}>
        {children}
    </MovieContext.Provider>

}