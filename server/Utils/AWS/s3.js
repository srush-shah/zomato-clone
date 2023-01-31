import AWS from "aws-sdk";

//AWS S3 bucket config
const s3Bucket = new AWS.S3({
  region: "ap-south-1",
}); //credentials taken directly from .env file

export const s3Upload = (options) => {
  return new Promise((resolve, reject) =>
    s3Bucket.upload(options, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    })
  );
};
