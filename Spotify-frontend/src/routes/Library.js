import { useEffect, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const [myplaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylist(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen={"library"}>
      <div className="text-white text-xl font-semibold pt-6">My Playlists</div>
      <div className="py-5 grid gap-5 grid-cols-5">
        {myplaylist.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              src={item.thumbnail}
              playlistId={item._id}
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

const Card = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
      onClick={() => {
        navigate("/playlist/" + props.playlistId);
      }}
    >
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={props.src} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{props.title}</div>
      <div className="text-gray-500 text-sm">{props.description}</div>
    </div>
  );
};

export default Library;
