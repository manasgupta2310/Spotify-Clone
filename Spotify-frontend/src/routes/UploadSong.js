import { useState } from "react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import IconText from "../components/shared/IconText";
import TextInput from "../components/shared/TextInput";
import TextWithHover from "../components/shared/TextWithHover";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const navigate = useNavigate();

  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl };
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    if(response.error){
      alert("Could not create a song");
      return;
    }

    alert("Success");
    navigate("/home");
  };

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
          <div className="logo p-6">
            <img src={spotify_logo} alt="spotify logo" width={125} />
          </div>
          <div>
            <Link to="/home">
              <IconText iconName={"material-symbols:home"} text="Home" active />
            </Link>
            <IconText iconName={"iconamoon:search-light"} text="Search" />
            <IconText iconName={"icomoon-free:books"} text="Your Library" />
            <Link to="/mymusic"><IconText iconName={"ic:round-library-music"} text="My Music" /></Link>
          </div>
          <div className="my-6">
            <IconText iconName={"subway:add-playlist"} text="Create Playlist" />
            <IconText
              iconName={"fluent-emoji-flat:heart-decoration"}
              text="Liked Songs"
            />
          </div>
        </div>
        <div className="px-5">
          <div className="border border-gray-100 text-gray-400 w-1/2 flex px-2 py-1 rounded-full items-center justify-center cursor-pointer hover:text-white">
            <Icon icon="ph:globe" color="white" />
            <div className="ml-2 text-sm font-semibold">English</div>
          </div>
        </div>
      </div>
      <div className="h-full w-4/5 bg-app-black overflow-auto">
        <div className="Navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
          <div className="w-2/8 h-full flex justify-around items-center">
            <Link to="/uploadsong">
              <TextWithHover text={"Upload Song"} />
            </Link>
            <Link
              to="/login"
              className="bg-white w-10 h-10 ml-4 mr-2 font-semibold rounded-full flex items-center justify-center cursor-pointer"
            >
              <div>Mg</div>
            </Link>
          </div>
        </div>
        <div className="Content p-8 pt-0 overflow-auto">
          <div className="font-semibold text-2xl mb-5 text-white mt-8">
            Upload Your Music
          </div>
          <div className="w-full flex space-x-3">
            <div className="w-1/3">
              <TextInput
                labelTextColor="text-white"
                label="Name"
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-1/3">
              <TextInput
                labelTextColor="text-white"
                label="Thumbnail"
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>
          <div className="py-5">
            {uploadedSongFileName ? (
              <div className="bg-white font-semibold p-3 px-10 w-1/3 rounded-full">
                {uploadedSongFileName.substring(0, 35)}....
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFileName}
              />
            )}
          </div>
          <div
            className="bg-white w-40 flex items-center justify-center font-semibold p-4 rounded-full cursor-pointer"
            onClick={submitSong}
          >
            Submit Song
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSong;
