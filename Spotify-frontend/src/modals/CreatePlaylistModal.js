import { useState } from "react";
import TextInput from "../components/shared/TextInput";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const CreatePlaylistModal = ({ closeModal }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");

  const createPlaylist = async () => {
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
      name: playlistName,
      thumbnail: playlistThumbnail,
      songs: [],
    });
    if(response._id){
        closeModal();
    }
  };

  return (
    <div
      className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-app-black w-1/3 rounded-md p-8"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="text-white mb-5 font-semibold text-lg">
          Create Playlist
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <TextInput
            label="Name"
            labelTextColor={"text-white"}
            placeholder="Playlist Name"
            value={playlistName}
            setValue={setPlaylistName}
          />
          <TextInput
            label="Thumbnail"
            labelTextColor={"text-white"}
            placeholder="Thumbnail"
            value={playlistThumbnail}
            setValue={setPlaylistThumbnail}
          />
          <div
            className="bg-white w-1/3 rounded flex font-semibold py-3 justify-center items-center mt-4 cursor-default"
            onClick={createPlaylist}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
