import Info from '../info/Info.jsx'
import React from 'react'
import { useGlobalContext } from '../context/useGlobal'
import Popular from './Popular'
import Upcoming from './Upcoming.jsx'
import Aired from './Aired.jsx'
import TopAnime from './TopAnime.jsx'
import { useState } from 'react'
import { CiSearch } from "react-icons/ci";


function Home() {

    const {handleSubmit, search, searchAnime, handleChange, getPopularAnime, getUpcomingAnime,  getAiringAnime} = useGlobalContext();

    const [rendered, setRendered] = useState('popular');
   

    const switchComponent = () => {
        switch(rendered){
            case 'popular':
                return <Popular rendered={rendered} />
            case 'upcoming':
                return <Upcoming rendered={rendered} />
            case 'aired':
                return <Aired rendered={rendered} />
            default:
                return <Popular rendered={rendered} />
        }
    };
    return (
        <>
          <Info />
          <div className="mt-[-100px] mx-3 md:mx-10 relative">
            <h1 className="my-5 font-extrabold text-3xl text-white text-center md:text-left md:ml-20 mb-8">Top Animes</h1>
            <div className="flex overflow-x-auto pb-10 scrollable1">
              <TopAnime />
            </div>
          </div>
    
          <div className="mt-16 text-2xl text-white flex flex-col justify-center items-center gap-10">
            <form onSubmit={handleSubmit} className="w-full max-w-[500px] px-4">
              <div className="relative flex items-center w-full">
                <input
                  className="text-lg text-white bg-[#121212] border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500   rounded-full outline-none w-full px-4 py-2"
                  type="text"
                  placeholder="Search Anime"
                  value={search}
                  onChange={handleChange}
                />
                <button className="text-white absolute right-4" type="submit" onClick={handleSubmit}>
                  <CiSearch className="text-3xl bg-transparent hover:text-blue-500" />
                </button>
              </div>
            </form>
    
            <div className="flex gap-2 md:gap-5 lg:gap-10 mt-0">
              <button
                className="border-2 p-2 px-4 rounded-full text-sm font-extrabold lg:text-lg hover:border-blue-500 hover:text-blue-500"
                onClick={() => {
                  setRendered('popular');
                  getPopularAnime();
                }}
              >Popular</button>
              <button
                className="border-2 p-2 px-4 rounded-full text-sm font-extrabold lg:text-lg  hover:border-blue-500 hover:text-blue-500"
                onClick={() => {
                  setRendered('upcoming');
                  getUpcomingAnime();
                }}
              >Upcoming</button>
              <button
                className="border-2 p-2 px-4 rounded-full text-sm font-extrabold lg:text-lg  hover:border-blue-500 hover:text-blue-500"
                onClick={() => {
                  setRendered('aired');
                  getAiringAnime();
                }}
              >Aired</button>
            </div>
          </div>    
          {switchComponent()}
        </>
      );
    };
    
    export default Home;
