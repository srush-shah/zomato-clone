//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { RestaurantModel } from "../../database/allModels";

//Validation
import {
  ValidateRestaurantCity,
  ValidateRestaurantSearchString,
} from "../../validation/restaurant";
import { ValidateRestaurantId } from "../../validation/food";

const Router = express.Router();

/*
Route   /
Desc    Get all the restaurant details based on the city
Params  none
Access  Public
Method  GET
*/

Router.get("/", async (req, res) => {
  try {
    await ValidateRestaurantCity(req.query);

    const { city } = req.query;
    const restaurants = await RestaurantModel.find({ city });
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route   /
Desc    Get individual restaurant details based on id
Params  id
Access  Public
Method  GET
*/

Router.get("/:_id", async (req, res) => {
  try {
    await ValidateRestaurantId(req.params);

    const { _id } = req.params;
    const restaurant = await RestaurantModel.findOne(_id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found!" });

    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route   /search
Desc    Get restaurant details based on search string
Params  none
Body    searchString
Access  Public
Method  GET
*/

Router.get("/search", async (req, res) => {
  try {
    await ValidateRestaurantSearchString(req.body);

    const { searchString } = req.body;
    const restaurants = await RestaurantModel.find({
      name: { $regex: searchString, $options: "i" }, //options "i" stands for case insensitive in regex
    });

    if (!restaurants)
      return res
        .status(404)
        .json({ error: `No restaurants matched with ${searchString}` });

    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
