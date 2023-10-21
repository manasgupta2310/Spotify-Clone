import { Icon } from "@iconify/react";
import LoggedInContainer from "../containers/LoggedInContainer";

const LikedSongs = () => {
  return (
    <LoggedInContainer>
      <div className="flex p-3 items-center">
          <Icon icon="fluent-emoji-flat:heart-decoration" width={100} className="mr-4"/>
        <div className="text-white text-4xl font-semibold">Liked Songs</div>
      </div>
    </LoggedInContainer>
  );
};

export default LikedSongs;
