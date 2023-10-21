import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SinglePlaylistView = () => {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const { playlistId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + playlistId
      );
      setPlaylistDetails(response);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen={"library"}>
      {playlistDetails._id && (
        <div>
          <div className="text-white text-xl font-semibold pt-6">
            {playlistDetails.name}
          </div>
          <div className="pt-10 space-y-2">
            {playlistDetails.songs.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                />
              );
            })}
          </div>
        </div>
      )}
    </LoggedInContainer>
  );
};

export default SinglePlaylistView;
