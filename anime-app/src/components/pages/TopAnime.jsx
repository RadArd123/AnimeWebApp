import { useGlobalContext } from "../context/useGlobal";
import TileCards from "../tileCards/TileCards";
import { Link } from "react-router-dom";


function TopAnime() {
    const { popularAnime } = useGlobalContext();

    // Filter currently airing anime
    const airingAnime = popularAnime.filter(anime => anime.status === "Currently Airing");

    // Combine popular and airing anime
    const combinedAnime = [...popularAnime, ...airingAnime];

    // Remove duplicates by mal_id
    const uniqueAnime = Array.from(new Set(combinedAnime.map(anime => anime.mal_id)))
        .map(id => combinedAnime.find(anime => anime.mal_id === id));

    // Sort by score and take the top 10
    const sorted = uniqueAnime.sort((a, b) => b.score - a.score);

        
  return (
    <>
      {sorted.map((anime, index) => {
            return (
                <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <TileCards
                        key={`${anime.mal_id}-${index}`}
                        animeName={anime.title}
                        index={index}
                        img={anime.images.jpg.image_url}
                    />
                </Link>
            )
        })}
    </>
      
    
  );
}       
export default TopAnime;