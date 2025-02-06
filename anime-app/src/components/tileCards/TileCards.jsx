import React from 'react';

function TileCards({ animeName, img, index}) {

  return (
    <div className="flex min-w-[200px] md:w-[250px] h-[300px] lg:h-[320px] rounded cursor-pointer ml-10 mr-10 ">
      <div className="flex flex-col justify-end  items-center w-[10%] gap-32 ">
        <p className="font-semibold text-white text-[20px] rotate-[270deg] whitespace-nowrap overflow-hidden text-ellipsis h-auto w-[250px] ">
          {animeName}
        </p>
        <span className="text-green-600 w-full font-extrabold text-[20px] items-center flex justify-center">{index+1}</span>
      </div>
      <img className="rounded ml-3" src={img} alt={`${animeName} cover`} />
    </div>
  );
}



export default TileCards;
