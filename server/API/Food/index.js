//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { FoodModel } from "../../database/allModels";

//Validation
import { ValidateRestaurantId, ValidateCategory } from "../../validation/food";

const Router = express.Router();

/*
Route   /r
Desc    Get all food based on particular restaurant
Params  _id
Access  Public
Method  GET
*/

Router.get("/r/:_id", async (req, res) => {
  try {
    await ValidateRestaurantId(req.params);

    const { _id } = req.params;
    const food = await FoodModel.find({ restaurant: _id });

    return res.json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route   /c
Desc    Get all food based on particular category
Params  category
Access  Public
Method  GET
*/

Router.get("/c/:category", async (req, res) => {
  try {
    await ValidateCategory(req.params);

    const { category } = req.params;
    const food = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });

    return res.json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
