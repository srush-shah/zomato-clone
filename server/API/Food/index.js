//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { FoodModel } from "../../database/allModels";

const Router = express.Router();

/*
Route   /
Desc    Get all the restaurant details based on the city
Params  none
Access  Public
Method  GET
*/
