import Express from "express";
import passport from "passport";
import Song from "../models/Song.js";
import User from "../models/User.js";
const router = Express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ error: "Insufficient details to create a song" });
    }
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const songs = await Song.find({artist: req.user._id}).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ error: "Artist does not exist" });
    }
    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;
    const songs = await Song.find({ name: songName }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

export default router;
