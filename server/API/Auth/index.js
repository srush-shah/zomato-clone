//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Models
import { UserModel } from "../../database/user";

const Router = express.Router();

/*
Route   /signup
Desc    Signup with email and password
Params  none
Access  Public
Method  POST
*/

Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullname, phoneNumber } = req.body.credentials;
    //check whether email exists
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ email });

    if (checkUserByEmail || checkUserByPhone) {
      return res.json({ error: "User already exists!" });
    }

    //once it is encrypted - it cannot be reverted back and cannot be decrypted - for same strings, same hash code will be created.
    //so passwords can be matched by matching hash codes

    //hash the password - library user is bcryptjs
    const bcryptSalt = await bcrypt.genSalt(8); //decided the number of times the encryption will be applied
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    //savetoDB
    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword,
    });

    //generate JWT auth token - library used is jsonwebtoken
    const token = jwt.sign({ user: { fullname, email } }, "ZomatoAPP"); //ZomatoAPP is the secret key to send the token to the user

    //return JWT token or respond to request
    return res.status(200).json({ token, status: "Success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
