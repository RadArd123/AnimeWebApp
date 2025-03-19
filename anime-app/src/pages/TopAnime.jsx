import { useAnimeStore } from "../components/context/useGlobal";
import TileCards from "../components/tileCards/TileCards";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function TopAnime() {
  const { animes, loading, fetchAnimes } = useAnimeStore();



  return (
    <>
      {animes?.map((anime, index) => {
        return (
          <Link to={`/anime/${anime._id}`} key={anime._id || index}>
            <TileCards
              animeName={anime.title}
              index={index}
              img={anime.img_panel}
            />
          </Link>
        );
      })}
    </>
  );
}

export default TopAnime;
