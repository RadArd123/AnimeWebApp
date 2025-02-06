
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/useGlobal'
import Cards from "../tileCards/Cards";



function Upcoming({rendered}) {
    const {upcomingAnime, isSearch, searchResults} = useGlobalContext();

    // Log the context values to debug
    console.log("upcomingAnime:", upcomingAnime);
    console.log("isSearch:", isSearch);

    const conditionalRender = () => {
        if (!isSearch && rendered === 'upcoming') {
            return upcomingAnime?.map((anime, index) => {
                return (
                    <Link to={`/anime/${anime.mal_id}`} key={`${anime.mal_id}-${index}`}>
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
        <div className=" relative">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden gap-6  w-full justify-items-center p-16 ">
                {conditionalRender()}
             </div>
        </div>
    )
}
export default Upcoming;    