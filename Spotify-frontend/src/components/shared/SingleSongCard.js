import { useContext } from "react";
import songContext from "../../contexts/songContext";

const SingleSongCard = ({ info, playSound }) => {

  const {currentSong, setCurrentSong} = useContext(songContext);


  return (
    <div
      className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
      onClick={() => {
        setCurrentSong(info);
      }}
    >
      <div
        className="w-10 h-10 bg-cover bg-center"
        style={{
          backgroundImage: `url("${info.thumbnail}")`,
        }}
      ></div>
      <div className="flex w-full">
        <div className="text-white flex justify-center flex-col pl-4 w-5/6">
          <div className="cursor-default">{info.name}</div>
          <div className="text-xs text-gray-400 cursor-pointer hover:underline">
            {info.artist.firstName + " " + info.artist.lastName}
          </div>
        </div>
        <div className="w-1/6 text-gray-400 text-sm flex items-center justify-center cursor-default">
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
