import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ detail: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, "ZomatoAPP"); //ZomatoAPP is the secret key to send the token to the user
};

UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
  //check whether email exists
  const checkUserByEmail = await UserModel.findOne({ email });
  const checkUserByPhone = await UserModel.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User already exists!");
  }

  return false;
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  //check whether user exists
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User does not exist!");

  //compare password
  const doesPasswordMatch = await bcrypt.compare(password, user.password);
  if (!doesPasswordMatch) throw new Error("Invalid Password!");

  return user;
};

UserSchema.pre("save", function (next) {
  // pre function is used to run while in a state of mongoose. "save" indicated the state of creating a database

  const user = this; //this refers to the object being created while creating database data object

  if (!user.isModified("password")) return next(); // if password is not modified, return next function

  //else, generate salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    //hash the password - library used is bcryptjs
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      //assigning hashed password
      user.password = hash;
      return next();
    });
  }); //since it's an async function, we will use a callback inside it
}); //All the next methods are methods lined up inside mongoose.

export const UserModel = mongoose.model("Users", UserSchema);
