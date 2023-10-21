import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import { Link } from "react-router-dom";
import { Children, useContext, useLayoutEffect, useRef, useState } from "react";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const LoggedInContainer = ({ children, currentActiveScreen }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;
    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };
  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <div className="h-full w-full bg-app-black">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className={`${currentSong ? "h-88" : "h-full"} w-full flex`}>
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
          <div>
            <div className="logo p-6">
              <img src={spotify_logo} alt="spotify logo" width={125} />
            </div>
            <div>
              <IconText
                iconName={"material-symbols:home"}
                text="Home"
                targetLink="/home"
                active={currentActiveScreen === "home"}
              />
              <IconText
                iconName={"iconamoon:search-light"}
                text="Search"
                targetLink="/search"
                active={currentActiveScreen === "search"}
              />
              <IconText
                iconName={"icomoon-free:books"}
                text="Your Library"
                targetLink="/library"
                active={currentActiveScreen === "library"}
              />
              <IconText
                iconName={"ic:round-library-music"}
                text="My Music"
                targetLink="/mymusic"
                active={currentActiveScreen === "mymusic"}
              />
            </div>
            <div className="my-6">
              <IconText
                iconName={"subway:add-playlist"}
                text="Create Playlist"
                onClick={() => {
                  setCreatePlaylistModalOpen(true);
                }}
                active={currentActiveScreen === "playlist"}
              />
              <IconText
                iconName={"fluent-emoji-flat:heart-decoration"}
                text="Liked Songs"
                targetLink="/likedsongs"
                active={currentActiveScreen === "likedsongs"}
              />
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
          <div className="Content p-8 pt-0 overflow-auto">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="h-12 w-full bg-black bg-opacity-30 flex items-center px-4 text-white">
          <div className="w-1/3 flex items-center">
            <img
              className="h-12 w-12 rounded-md cursor-pointer"
              src={currentSong.thumbnail}
              alt="currentSongImg"
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-gray-400 text-xs hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
            <Icon
              icon="ant-design:heart-outlined"
              className="text-xl ml-4  justify-center items-center text-gray-400 cursor-pointer hover:text-white"
            />
          </div>
          <div className="w-1/3 h-full flex justify-center flex-col items-center">
            <div className="flex w-1/2 justify-between items-center">
              <Icon
                icon="fluent:arrow-shuffle-16-regular"
                fontSize={20}
                className="text-gray-400 hover:text-white"
              />
              <Icon
                icon="fa6-solid:backward-step"
                fontSize={20}
                className="text-gray-400 hover:text-white"
              />
              <Icon
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
                }
                fontSize={35}
                onClick={togglePlayPause}
              />
              <Icon
                icon="fa6-solid:forward-step"
                fontSize={20}
                className="text-gray-400 hover:text-white"
              />
              <Icon
                icon="iconoir:repeat"
                fontSize={20}
                className="text-gray-400 hover:text-white"
              />
            </div>
          </div>
          <div className="w-1/3 flex justify-end space-x-3 text-gray-400 items-center">
            <Icon
              icon="ic:round-playlist-add"
              className="cursor-pointer hover:text-white"
              fontSize={25}
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />
            <Icon
              icon="bi:file-play"
              className="cursor-pointer hover:text-white"
              fontSize={15}
            />
            <Icon
              icon="tabler:microphone-2"
              className="cursor-pointer hover:text-white"
              fontSize={15}
            />
            <Icon
              icon="heroicons:queue-list"
              className="hover:text-white"
              fontSize={15}
            />
            <Icon
              icon="lucide:monitor-speaker"
              className="hover:text-white"
              fontSize={15}
            />
            <Icon
              icon="game-icons:speaker"
              className="hover:text-white"
              fontSize={18}
            />
          </div>
          <Icon
            icon="octicon:horizontal-rule-16"
            width="70"
            className="ml-1 text-gray-400 hover:text-green-500"
          />
          <Icon
            icon="entypo:resize-full-screen"
            className="ml-3 text-gray-400 cursor-pointer hover:text-white"
            fontSize={15}
          />
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
