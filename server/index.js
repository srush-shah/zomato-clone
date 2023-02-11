//env Variables
require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";

//Config
import googleConfig from "./config/google.config";

//Microservice routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Image from "./API/Image";
import Order from "./API/Order";
import Review from "./API/Review";

// Database connection
import ConnectDB from "./database/connection";

const zomato = express();

// application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
zomato.use(passport.initialize());
zomato.use(passport.session());

//Passport configuration
googleConfig(passport);

//Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/review", Review);

zomato.get("/", (req, res) => res.json({ message: "Setup Success" }));

zomato.listen(4000, () =>
  ConnectDB()
    .then(() => console.log("Server is running!"))
    .catch(() =>
      console.log("Server is running, but database connection failed.")
    )
);
