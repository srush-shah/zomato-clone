//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { UserModel } from "../../database/allModels";
import { ValidateUserId, ValidateUserData } from "../../validation/user";

const Router = express.Router();

/*
Route   /
Desc    Get user data
Params  _id
Access  Public
Method  GET
*/
Router.get("/:_id", async (req, res) => {
  try {
    await ValidateUserId(req.params);
    const { _id } = req.params;
    const getUser = await UserModel.findById(_id);

    return res.json({ user: getUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
Route   /update/:_id
Desc    Update user data
Params  _id
Body    User data
Access  Public
Method  PUT
*/
Router.put("/update/:_id", async (req, res) => {
  try {
    await ValidateUserId(req.params);
    await ValidateUserData(req.body);
    const { _id } = req.params;
    const { userData } = req.body;

    const updateUserData = await UserModel.findByIdAndUpdate(
      _id,
      {
        $set: userData,
      },
      { new: true }
    );

    return res.json({ user: updateUserData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default Router;
