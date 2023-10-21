import { useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);

  const searchSong = async () => {
    const response = await makeAuthenticatedGETRequest(
      "/song/get/songname/" + searchText
    );
    setSongData(response.data);
    setSearchText("");
  };

  return (
    <LoggedInContainer currentActiveScreen="search">
      <div className="w-full py-2">
        <div
          className={`w-1/3 p-3 text-xs rounded-full bg-search-bar-color px-5 flex text-white space-x-3 items-center ${
            isInputFocused
              ? "border border-white"
              : "hover:border border-gray-600"
          }`}
        >
          <Icon icon="gg:search" className="text-lg" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-search-bar-color focus: outline-none"
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
        {songData.length > 0 && (
          <div className="pt-10 space-y-2">
            <div className="text-white font-bold">Songs</div>
            {songData.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                />
              );
            })}
          </div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default SearchPage;
