//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { ReviewModel } from "../../database/allModels";

//Validation
import { ValidateReviewId, ValidateReviewObj } from "../../validation/review";

const Router = express.Router();

/*
Route   /new
Desc    Add new food review/rating
Params  NONE
Body    Review Object
Access  Public
Method  GET
*/
Router.post("/new", async (req, res) => {
  try {
    await ValidateReviewObj(req.body);

    const { reviewData } = req.body;
    await ReviewModel.create(reviewData);

    return res.json({ review: "Review created successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
Route   /delete
Desc    Delete food review/rating
Params  _id (Review ID) 
Access  Public
Method  DELETE
*/
Router.delete("/delete", async (req, res) => {
  try {
    const { _id } = req.params;

    await ReviewModel.findByIdAndDelete(_id);

    return res.json({ review: "Review successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default Router;
