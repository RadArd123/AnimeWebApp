import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const ADD_TO_WATCHLIST = "ADD_TO_WATCHLIST";
const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
const REMOVE_FROM_WATCHLIST = "REMOVE_FROM_WATCHLIST";
const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case SEARCH:
            return { ...state, searchResults: action.payload, loading: false };
        case GET_POPULAR_ANIME:
            return { ...state, popularAnime: action.payload, loading: false };
        case GET_UPCOMING_ANIME:
            return { ...state, upcomingAnime: action.payload, loading: false };
        case GET_AIRING_ANIME:
            return { ...state, airingAnime: action.payload, loading: false };
        case ADD_TO_WATCHLIST:
            return { ...state, watchlist: [...new Set([...state.watchlist, action.payload])] };
        case ADD_TO_FAVORITES:
            return { ...state, favorites: [...new Set([...state.favorites, action.payload])] };
        case REMOVE_FROM_WATCHLIST:
            return { ...state, watchlist: state.watchlist.filter(title => title !== action.payload) };
        case REMOVE_FROM_FAVORITES:
            return { ...state, favorites: state.favorites.filter(title => title !== action.payload) };
        default:
            return state;
    }
};

export const GlobalContextProvider = ({ children }) => {
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false,
        watchlist: JSON.parse(localStorage.getItem('watchlist')) || [],
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch]  = useState('');   

    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value === ''){
            state.isSearch = false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            searchAnime(search);
            state.isSearch = true;
        }else{
            state.isSearch = false;
            alert('Please enter a valid search query');
        } 
    }

 
    const getPopularAnime = async () => {
        dispatch({ type: LOADING });
        try {
            const res = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
            const data = await res.json();
            if (res.ok) {
                dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
            }
        } catch (error) {
            console.error("Error fetching popularAnime:", error);
        }
    };
    
    const searchAnime  = async (anime) => {
        dispatch({ type: LOADING });
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await res.json();
        dispatch({ type: SEARCH, payload: data.data });
    }
    console.log(state.searchResults);

    const getUpcomingAnime = async () => {
        dispatch({ type: LOADING });
        try {
            const res = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
            const data = await res.json();
            if (res.ok) {
                dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
            }
        } catch (error) {
            console.error("Error fetching upcomingAnime:", error);
        }
    };

    const getAiringAnime = async () => {
        dispatch({ type: LOADING });
        try {
            const res = await fetch(`${baseUrl}/top/anime?filter=airing`);
            const data = await res.json();
            if (res.ok) {
                dispatch({ type: GET_AIRING_ANIME, payload: data.data });
            }
        } catch (error) {
            console.error("Error fetching airingAnime:", error);
        }
    };

    const addToWatchlist = (title) => {
        dispatch({ type: ADD_TO_WATCHLIST, payload: title });
        const updatedWatchlist = [...new Set([...state.watchlist, title])];
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    const addToFavorites = (title) => {
        dispatch({ type: ADD_TO_FAVORITES, payload: title });
        const updatedFavorites = [...new Set([...state.favorites, title])];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const removeFromWatchlist = (title) => {
        dispatch({ type: REMOVE_FROM_WATCHLIST, payload: title });
        const updatedWatchlist = state.watchlist.filter(item => item !== title);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    const removeFromFavorites = (title) => {
        dispatch({ type: REMOVE_FROM_FAVORITES, payload: title });
        const updatedFavorites = state.favorites.filter(item => item !== title);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    useEffect(() => {
        getPopularAnime();
        getUpcomingAnime();
        getAiringAnime();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                handleChange,
                handleSubmit,
                searchAnime,
                search,
                getAiringAnime,
                getPopularAnime,
                getUpcomingAnime,
                addToWatchlist,
                addToFavorites,
                removeFromWatchlist,
                removeFromFavorites,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};