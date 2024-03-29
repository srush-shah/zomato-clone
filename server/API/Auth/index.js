//Library
import express from "express";
import passport from "passport";

//Models
import { UserModel } from "../../database/user";

//Validation
import { ValidateSignup, ValidateSignin } from "../../validation/auth";

const Router = express.Router();

Router.post("/signup", async (req, res) => {
  try {
    await ValidateSignup(req.body.credentials);

    await UserModel.findByEmailAndPhone(req.body.credentials);

    const newUser = await UserModel.create(req.body.credentials);

    const token = newUser.generateJwtToken();

    return res.status(200).json({ token, status: "Success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route   /signin
Desc    Signin with email and password
Params  none
Access  Public
Method  POST
*/

Router.post("/signin", async (req, res) => {
  try {
    await ValidateSignin(req.body.credentials);

    const user = await UserModel.findByEmailAndPassword(req.body.credentials);

    const token = user.generateJwtToken();

    return res.status(200).json({ token, status: "Success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route   /google
Desc    Google Sign In
Params  none
Access  Public
Method  GET
*/

Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
); // provided a middleware using passport.authenticate, and added scope which defines what permissions are we providing to be accessed.

/*
Route   /google/callback 
Desc    Google Sign In Callback
Params  none
Access  Public
Method  GET
*/

Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.json({ token: req.session.passport.user.token });
  }
);

export default Router;
