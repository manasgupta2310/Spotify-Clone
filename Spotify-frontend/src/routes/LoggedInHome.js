import CardsDescription from "../assets/data/CardsData";
import LoggedInContainer from "../containers/LoggedInContainer";

const LoggedInHomeComponent = () => {
  return (
    <LoggedInContainer currentActiveScreen="home">
      <PlaylistView titleText="Focus" CardsData={CardsDescription} />
      <PlaylistView
        titleText="Spotify Playlists"
        CardsData={CardsDescription}
      />
      <PlaylistView titleText="Sound of India" CardsData={CardsDescription} />
    </LoggedInContainer>
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

export default LoggedInHomeComponent;
