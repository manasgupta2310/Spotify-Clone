import { Icon } from "@iconify/react";

const TextWithHover = (props) => {
  return (
    <div className="flex items-center justify-start cursor-pointer">
      <div>
        <div className="text-gray-500 text-lg font-semibold hover:text-white">
          {props.text}
        </div>
      </div>
    </div>
  );
};

export default TextWithHover;
