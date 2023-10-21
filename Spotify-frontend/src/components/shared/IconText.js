import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = (props) => {
  return (
    <Link to={props.targetLink} className="block">
      <div
        className="flex items-center justify-start cursor-pointer"
        onClick={props.onClick}
      >
        <div className="px-5 py-2">
          <Icon
            icon={props.iconName}
            color={props.active ? "white" : "gray"}
            fontSize={30}
          />
        </div>
        <div>
          <div
            className={`${
              props.active ? "text-white" : "text-gray-400"
            } text-sm font-semibold hover:text-white`}
          >
            {props.text}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IconText;
