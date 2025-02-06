import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/useGlobal';

function Content() {
    const { id } = useParams();
    const { addToWatchlist, addToFavorites, watchlist, favorites } = useGlobalContext();

    const [anime, setAnime] = useState({});
    const [showMore, setShowMore] = useState(false);

    const { 
        title = " ", 
        synopsis, 
        score, 
        scored_by,
        images,
        trailer,
        aired,
        rating,
        rank,
        popularity,
        status,
        source,
        season,
        duration,
    } = anime;

    const getAnime = async () => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        setAnime(data.data);
        
    };
   
    useEffect(() => {
        getAnime(id);
    }, [id]);

   
    return (
        <div className='min-h-screen bg-[#121212] w-full p-4 md:p-10 lg:p-40 flex flex-col text-white'>
            <div className='flex items-center justify-between mt-4 md:mt-8 lg:mt-19'>
                <h1 className='text-2xl md:text-3xl font-bold mt-20 sm:mt-0'>{title}</h1>
            </div>
            <div className="flex flex-col lg:flex-row h-auto lg:h-[500px] w-full rounded-md overflow-hidden mt-4 md:mt-8 lg:mt-10">
                {images && images.jpg && (
                    <img src={images.jpg.image_url} className='h-[300px] md:h-96 lg:h-full w-full lg:w-auto rounded-md' alt={title} />
                )}
                {trailer && trailer.embed_url && (
                    <iframe
                        className='h-64 md:h-96 lg:h-full w-full lg:w-[900px] rounded-md mt-4 lg:mt-0 lg:ml-4'
                        width="100%"
                        height="100%"
                        src={trailer.embed_url}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
                <div className='flex flex-col bg-[#b3b2b27a] p-4 rounded-md mt-4 lg:mt-0 lg:ml-4 w-full lg:w-[350px]'>
                    <button
                        className='bg-red-500 text-white p-2 rounded-md mb-2'
                        onClick={() => addToWatchlist(title)}
                    >
                        Add to Watchlist
                    </button>
                    <button
                        className='bg-blue-500 text-white p-2 rounded-md'
                        onClick={() => addToFavorites(title)}
                    >
                        Add to Favourites
                    </button>
                    <div className='flex flex-col mt-4 md:mt-7 justify-center gap-2'>
                        <p><span>Aired: </span><span>{aired?.string}</span></p>
                        <p><span>Rating: </span><span>{rating}</span></p>
                        <p><span>Rank: </span><span>{rank}</span></p>
                        <p><span>Score: </span><span>{score}</span></p>
                        <p><span>Score By: </span><span>{scored_by}</span></p>
                        <p><span>Popularity: </span><span>{popularity}</span></p>
                        <p><span>Status: </span><span>{status}</span></p>
                        <p><span>Source: </span><span>{source}</span></p>
                        <p><span>Season: </span><span>{season}</span></p>
                        <p><span>Duration: </span><span>{duration}</span></p>
                    </div>
                </div>
            </div>
            <p className='mt-4 md:mt-8 lg:mt-10 text-base md:text-lg'>
                {showMore ? synopsis : `${synopsis?.substring(0, 350)}...`}
                <button className='text-purple-500 ml-2' onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Show Less' : 'Show More'}
                </button>
            </p>
        </div>
    );
};


export default Content;