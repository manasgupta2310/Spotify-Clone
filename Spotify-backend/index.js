import Express from "express";
import mongoose from "mongoose";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import User from "./models/User.js";
import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/song.js";
import playlistRoutes from "./routes/playlist.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = Express();
const port = 8080;

app.use(cors());
app.use(Express.json());

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USERNAME +
      ":" +
      process.env.MONGO_PASSWORD +
      "@cluster0.aly8nzx.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then((x) => {
    console.log("Connected to Mongo!!");
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo!!");
  });

// Passport package setup
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "";
passport.use(
  new JwtStrategy(opts, async(jwt_payload, done) => {
    let user;
    try{
      user = await User.findById(jwt_payload.identifier);
        if (!user) {
          return done(null, false);
      };
    }
    catch (err) {
      return done(err, false);
    }

    return done(null, user);
  })
);

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
