import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleImg from "./ContentComponents/TitleImg.jsx";
import AnimeEpisodes from "./ContentComponents/AnimeEpisodes.jsx";
import Comments from "./ContentComponents/Comments.jsx";
import {useAnimeStore} from "../components/context/useGlobal.js"


function Content() {
  const { id } = useParams();
  const {currentAnime, fetchAnime, loading} = useAnimeStore();


  
  
  useEffect(() => {
    fetchAnime(id);
  }, [fetchAnime,id]);
  console.log(currentAnime);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <>
      <div>
        {currentAnime ? (
          <>
            <TitleImg animes={[currentAnime]} />
            <AnimeEpisodes animes={[currentAnime]} />
            <Comments animeId={id} />
          </>
        ) : (
          <div className="text-center py-8 text-gray-600 h-screen flex items-center justify-center">
            <p>No anime data found</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Content;
