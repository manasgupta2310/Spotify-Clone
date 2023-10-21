import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: "Song",
    }],
    collaborators: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }],
});

const playlistModel = mongoose.model("Playlist",playlistSchema);

export default playlistModel;