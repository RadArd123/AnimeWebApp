import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

import img1 from "../../assets/dandadan.jpg";
import img2 from "../../assets/kaiju.jpg";
import img3 from "../../assets/demonslayer.png";
import img4 from "../../assets/boruto.webp";

import React, { useState, useRef, useEffect } from 'react';

function Info() {
    const [anime, setAnime] = useState({});
    const [backPhoto, setBackPhoto] = useState(img1);
    const [index, setIndex] = useState(0);
     const [showMore, setShowMore] = useState(false);
    const intervalIdRef = useRef(null);

    const slideShow = [
      { img: img1, id: 57334 }, 
      { img: img2, id: 52588 },
      { img: img3, id: 38000 },
      { img: img4, id: 34566 }
  ];

    const getAnime = async (id) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        setAnime(data.data);
      
    };

    useEffect(() => {
        getAnime(slideShow[index].id);
    }, [index]);

    const startSlideShow = () => {
        let i = 0;
        intervalIdRef.current = setInterval(() => {
            i = (i + 1) % slideShow.length;
            setBackPhoto(slideShow[i].img);
            setIndex(i);
        }, 3000);
    };

    useEffect(() => {
        startSlideShow();
        return () => clearInterval(intervalIdRef.current);
    }, []);

    const nextPicture = () => {
        clearInterval(intervalIdRef.current);
        setIndex((i) => (i + 1) % slideShow.length);
        setBackPhoto(slideShow[(index + 1) % slideShow.length].img);
    };

    const previousPicture = () => {
        clearInterval(intervalIdRef.current);
        setIndex((i) => (i - 1 + slideShow.length) % slideShow.length);
        setBackPhoto(slideShow[(index - 1 + slideShow.length) % slideShow.length].img);
    };

    return (
        <div className="relative flex items-center justify-center w-full h-screen overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <img 
                    src={backPhoto} 
                    alt="background" 
                    className="w-full h-full object-cover sm:object-fill" 
                />
                <div 
                    className="absolute inset-0"
                    style={{
                        background: `
                            linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.6) 100%)
                        `
                    }}
                />
                <div 
                    className="absolute bottom-0 w-full h-1/3"
                    style={{
                        background: 'linear-gradient(to top, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0) 100%)'
                    }}
                />
            </div>
            <button 
                className="absolute left-4 text-white z-10 hover:opacity-80 text-3xl sm:text-4xl md:text-5xl"
                onClick={previousPicture}
            >
                <GrFormPrevious />
            </button>
            <button 
                className="absolute right-4 text-white z-10 hover:opacity-80 text-3xl sm:text-4xl md:text-5xl"
                onClick={nextPicture}
            >
                <MdNavigateNext />
            </button>

        
            <div className="absolute items-center p-20 lg:p-0 top-1/2  lg:left-32 2xl:left-40 transform -translate-y-1/2 text-white font-montserrat max-w-4xl">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2">
                    {anime?.title || "Loading..."}
                </h1>
                <p className="text-sm md:text-lg mb-4">
                    {anime?.title_japanese || ""}
                </p>
                <p className="text-xs md:text-base mb-4 max-w-[550px]">
                    {`${anime?.synopsis?.substring(0, 250)}...`}
                  
                </p>
                <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                    <span className="flex items-center">
                        <FaStar className="text-2xl md:text-3xl text-yellow-500" />
                        <p className="ml-2 text-lg md:text-xl">
                            {anime?.score} ({anime?.scored_by} ratings)
                        </p>
                    </span>
                    <span className="flex items-center">
                        <FaHeart className="text-2xl md:text-3xl text-red-400" />
                        <p className="ml-2 text-lg md:text-xl">
                            {anime?.members}
                        </p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Info;