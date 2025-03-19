import React from 'react';

const AnimeEpisodes = ({ animes }) => {
  return (
    <>
      <div className="flex justify-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-12 px-10"> 
          {animes.map((anime) => (
            anime.episodes?.map((episode, index) => (
              <div key={episode.id || index} 
                   className="bg-black rounded-xl w-[350px] overflow-hidden shadow-lg  hover:scale-110 duration-700">
                <div className="aspect-video w-full">
                  <iframe 
                    src={episode.episode_video_url}
                    title={`${anime.title} - ${episode.episode_title}`}
                    allowFullScreen
                    className="w-full h-full object-fill"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    <span className="text-indigo-600">
                      Episode {episode.episode_number}
                    </span>{" "}
                    {episode.episode_title}
                  </h3>
                  {episode.episode_description && (
                    <p className="text-gray-400 mt-2 text-sm">
                      {episode.episode_description}
                    </p>
                  )}
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimeEpisodes;