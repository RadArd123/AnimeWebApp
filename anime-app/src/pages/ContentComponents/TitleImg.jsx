function TitleImg({ animes }) {
    return (
      <div className="flex justify-center ">
        {animes.map((anime, index) => (
          <div key={anime._id || index} className="w-full">
            <div className="flex flex-col items-center mb-12 relative ">
              {anime.img_url && (
                <img
                  src={anime.img_url}
                  alt={anime.title}
                  className="w-full h-[90vh] object-cover rounded-lg shadow-lg "
                />
              )}
              <div className="absolute inset-0 flex flex-col justify-end w-full p-[6%] bg-gradient-to-t from-black via-black/70 to-transparent rounded-lg ">
                <h1 className="text-4xl font-bold text-[#3a57ea] mb-2">
                  {anime.title}
                </h1>
                {anime.genres?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 font-extrabold rounded-full text-sm "
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
                <button className="bg-[#3a57ea] w-64 p-2 font-extrabold text-white rounded-lg hover:bg-[#657be8]">Start Playing Ep:1</button>
                {anime.description && (
                  <p className="text-white text-lg w-[450px] font-extrabold mt-5">
                    {anime.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
    );
  }
  
  export default TitleImg;