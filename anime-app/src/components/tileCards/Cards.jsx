

function Cards({img, animeName}){
    return (
        <div  className="flex flex-col justify-center items-stretch  min-w-[180px] w-[250px]  overflow-hidden p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] ">
          <div className="w-full h-[340px] bg-gray-200 rounded overflow-hidden">
            <img className="object-cover w-full h-full" src={img} alt="" />
          </div>
        <div className="text-white">
            <p className="font-bold mt-2 mb-1  whitespace-nowrap overflow-hidden text-ellipsis">{animeName}</p>
            <p className=" text-sm"></p>
        </div>
       
    </div>
      );
}
export default Cards