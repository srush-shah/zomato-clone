//Libraries
import express from "express";
import passport from "passport";
import multer from "multer";

//Database Model
import { ImageModel } from "../../database/allModels";

//Utilities
import { s3Upload } from "../../Utils/AWS/s3";

//Validation
import { ValidateImage } from "../../validation/image";

const Router = express.Router();

//Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
Route   /
Desc    Uploads given image to S3 bucket, and saves file link to MongoDB
Params  id
Access  Public
Method  POST
*/
Router.post("/", upload.single("file"), async (req, res) => {
  try {
    await ValidateImage(req.file);
    const file = req.file;

    //S3 bucket options
    const bucketOptions = {
      Bucket: "zomatoclonemaster",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const uploadImage = await s3Upload(bucketOptions); //returns URL of the image

    return res.status(200).json({ uploadImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
