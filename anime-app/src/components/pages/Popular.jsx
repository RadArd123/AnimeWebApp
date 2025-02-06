import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobal";
import Cards from "../tileCards/Cards";


function Popular({rendered}) {

    const {popularAnime,  isSearch, searchResults} = useGlobalContext();

    const conditionalRender = () => {
      if (!isSearch && rendered === 'popular') {
        return popularAnime?.map((anime, index) => {
          return (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <Cards
                id={anime.mal_id}
                key={`${anime.mal_id}-${index}`}
                animeName={anime.title}
                img={anime.images.jpg.image_url}
              />
            </Link>
          );
        });
      } else {
        return searchResults.map((anime, index) => {
          return (
              <Link to={`/anime/${anime.mal_id}`} key={`${anime.mal_id}-${index}`}>
                  <Cards
                      id={anime.mal_id}
                      animeName={anime.title}
                      img={anime.images.jpg.image_url}
                  />
              </Link>
          );
      });
  }
};


    return (
        <div>
             <div className=" relative">
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden gap-6  w-full justify-items-center p-16 ">
                    {conditionalRender()}
                 </div>
            </div>
        </div>
      
    )
}
export default Popular;