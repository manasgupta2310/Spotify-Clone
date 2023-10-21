import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import CardsDescription from "../assets/data/CardsData";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
          <div className="logo p-6">
            <img src={spotify_logo} alt="spotify logo" width={125} />
          </div>
          <div>
            <IconText iconName={"material-symbols:home"} text="Home" active />
            <IconText iconName={"iconamoon:search-light"} text="Search" />
            <IconText iconName={"icomoon-free:books"} text="Your Library" />
          </div>
          <div className="my-6">
            <IconText iconName={"subway:add-playlist"} text="Create Playlist" />
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
            <Link to="/signup">
              <TextWithHover text="Sign up" />
            </Link>
            <Link
              to="/login"
              className="bg-white h-2/3 px-8 ml-4 mr-2 font-semibold rounded-full flex items-center justify-center cursor-pointer"
            >
              <div>Log in</div>
            </Link>
          </div>
        </div>
        <div className="Content p-8 pt-0 overflow-auto">
          <PlaylistView titleText="Focus" CardsData={CardsDescription} />
          <PlaylistView
            titleText="Spotify Playlists"
            CardsData={CardsDescription}
          />
          <PlaylistView
            titleText="Sound of India"
            CardsData={CardsDescription}
          />
        </div>
      </div>
    </div>
  );
};

const PlaylistView = (props) => {
  return (
    <div className="text-white mt-8">
      <div className="font-semibold text-2xl mb-5">{props.titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {props.CardsData.map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              src={item.src}
            />
          );
        })}
      </div>
    </div>
  );
};

const Card = (props) => {
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={props.src} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{props.title}</div>
      <div className="text-gray-500 text-sm">{props.description}</div>
    </div>
  );
};

export default HomeComponent;
