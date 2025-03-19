import { Link } from "react-router-dom";
import { useAnimeStore } from "../components/context/useGlobal.js";
import Cards from "../components/tileCards/Cards";

function Upcoming({ rendered }) {
  const { animes, loading } = useAnimeStore();


  const conditionalRender = () => {
    if (!loading && rendered === "upcoming") {
      return animes?.map((anime, index) => {
        return (
          <Link to={`/anime/${anime._id}`} key={`${anime._id}-${index}`}>
            <Cards
              id={anime._id}
              key={`${anime._id}-${index}`}
              animeName={anime.title}
              img={anime.img_panel}
            />
          </Link>
        );
      });
    } 
  };

  return (
    <div className=" relative">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden gap-6  w-full justify-items-center p-16 ">
        {conditionalRender()}
      </div>
    </div>
  );
}
export default Upcoming;
