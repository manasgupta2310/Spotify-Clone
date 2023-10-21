import Express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { getToken } from "../utils/helpers.js";
const router = Express.Router();

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);

  const token = await getToken(email, newUser);
  const userToReturn = { ...newUser.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ error: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    return res.status(403).json({ error: "Invalid credentials" });
  }

  const token = await getToken(user.email,user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

export default router;
