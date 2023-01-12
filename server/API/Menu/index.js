//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { MenuModel, ImageModel } from "../../database/allModels";

const Router = express.Router();

/*
Route   /list - list of food items
Desc    Get all list menu based on id
Params  _id
Access  Public
Method  GET
*/

Router.get("/list/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menu = await MenuModel.findOne(_id);

    return res.json({ menu });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route   /image
Desc    Get all menu images based on id
Params  _id
Access  Public
Method  GET
*/

Router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menu = await ImageModel.findOne(_id);

    return res.json({ menu });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
