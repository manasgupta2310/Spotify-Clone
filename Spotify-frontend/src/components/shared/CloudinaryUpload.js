import { cloudinary_upload_preset } from "../../config";
import { openUploadWidget } from "../../utils/CloudinaryService";

const CloudinaryUpload = ({setUrl,setName}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dq2nrxykz",
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button
      className="greenButton bg-white font-semibold p-3 px-10 rounded-full"
      onClick={uploadImageWidget}
    >
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
