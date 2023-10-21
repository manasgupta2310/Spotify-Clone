import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import SingleSongCard from "../components/shared/SingleSongCard";
import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import { Link } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useEffect, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      setSongData(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen="mymusic">
      <div className="font-semibold text-2xl pb-5 pl-2 pt-8 text-white cursor-default">
        My Songs
      </div>
      <div className="space-y-2 overflow-auto">
        {songData.map((item) => {
          return <SingleSongCard info={item} playSound={() => {}} />;
        })}
      </div>
    </LoggedInContainer>
  );
};

export default MyMusic;
