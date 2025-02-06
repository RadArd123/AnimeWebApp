import React, { useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { MdAnchor } from "react-icons/md";
import { useGlobalContext } from '../context/useGlobal';
import { Link, useNavigate } from 'react-router-dom';
import {FaUserCircle } from "react-icons/fa";


function Navbar() {
    const { watchlist, favorites, removeFromWatchlist, removeFromFavorites } = useGlobalContext();
    const [showFavorites, setShowFavorites] = useState(false);
    const [showWatchlist, setShowWatchlist] = useState(false);
    const [showUserInfo, setShowLoginInfo] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
        setShowWatchlist(false); 
    };

    const toggleWatchlist = () => {
        setShowWatchlist(!showWatchlist);
        setShowFavorites(false); 
    };

    const toggleShowInfo = () => {
        setShowLoginInfo(!showUserInfo);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="w-full flex justify-between items-center py-4 px-4 sm:py-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 fixed z-50 bg-gradient-to-b from-[#090909] via-transparent to-[#00000000]">
            <div className="flex items-center text-white gap-4 sm:gap-8 font-montserrat">
                <a className="text-xl sm:text-2xl text-white font-bold cursor-pointer" href="/">AnyRad.</a>
                <a className="text-purple-500 text-[10px] sm:text-base font-semibold  cursor-pointer" href="/">Home</a>
                <div className="relative">
                    <a className="text-[10px] flex sm:text-base font-semibold  items-center hover:text-purple-500 transition duration-300 cursor-pointer"
                        onClick={toggleFavorites}>
                        Anime <MdAnchor className="text-lg sm:text-xl bg-transparent ml-1" />
                    </a>
                    {showFavorites && (
                        <div className="absolute bg-gray-700 text-white p-2 rounded mt-2 w-[200px] sm:w-[300px]">
                            {favorites.length > 0 ? (
                                favorites.map((anime, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <Link to={`/anime/${anime}`} className="hover:underline">{anime}</Link>
                                        <button onClick={() => removeFromFavorites(anime)} className="ml-2 text-red-500">Remove</button>
                                    </div>
                                ))
                            ) : (
                                <div>No favorite animes</div>
                            )}
                        </div>
                    )}
                </div>
                <div className="relative">
                    <a
                        className="text-[10px] sm:text-base font-semibold hover:text-purple-500 transition duration-300 cursor-pointer"
                        onClick={toggleWatchlist}
                    >
                        BookMarked
                    </a>
                    {showWatchlist && (
                        <div className="absolute bg-gray-700 text-white p-2 rounded mt-2 w-[200px] sm:w-[300px]">
                            {watchlist.length > 0 ? (
                                watchlist.map((anime, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <Link to={`/anime/${anime}`} className="hover:underline">{anime}</Link>
                                        <button onClick={() => removeFromWatchlist(anime)} className="ml-2 text-red-500">Remove</button>
                                    </div>
                                ))
                            ) : (
                                <div>No items in watchlist</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 ">
                <a href="https://github.com/RadArd123/WebApp" target="_blank" rel="noopener noreferrer">
                    <button className="text-white hover:text-purple-500 transition duration-300">
                        <FaGithub className="text-2xl sm:text-3xl bg-transparent" />
                    </button>
                </a>
                <button onClick={toggleShowInfo} className="hover:bg-gray-700 mt-[-4px] p-2">
                    <FaUserCircle  className="text-3xl text-white" />
                </button>
                {showUserInfo && (
                        <div className="flex flex-col absolute right-32 top-[60px] bg-gray-700 text-white  rounded  w-[200px] ">
                                <a className="text-white font-extrabold hover:bg-gray-500 p-3">Manage Acount</a>
                               {token?(
                                <Link to={`/login`}onClick = {handleLogout} className="text-white font-extrabold  hover:bg-gray-500 p-3">Sign-Out</Link>
                                ):(
                                <Link to={`/login`} className="text-white font-extrabold  hover:bg-gray-500 p-3">Create Account</Link>
                                )}
                        </div>
                )}
             </div>
        </nav>
    );
}

export default Navbar;