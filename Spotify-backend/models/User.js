import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    likedSongs: {
        type: String,
        default: "",
    },
    likedPlatLists: {
        type: String,
        default: "",
    },
    subscribedArtists: {
        type: String,
        default: "",
    },
});

const userModel = mongoose.model("User",userSchema);

export default userModel;