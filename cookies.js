import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { connect } from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userModel.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();

const db = process.env.DB_URL;

const SECRET_KEY = "SomeRandomKery@12321";

connect(db)
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("Connection failed"));

// home
app.get("/", (req, res) => {
  try {
    res.cookie("pageVisited", "home", {
      maxAge: 1000 * 2,
      httpOnly: true,
    });
    res.json({
      message: "Welcome to home page",
    });
  } catch (err) {
    res.send({ message: err.message });
  }
});

// Products
app.get("/products", (req, res) => {
  try {
    res.cookie("product", "bestSeller", {
      maxAge: 1000 * 5,
      httpOnly: true,
      path: "/products",
    });

    const { pageVisited } = req.cookies;
    if (pageVisited) {
      res.send({
        message: "Welcome back",
      });
    } else {
      res.send({
        message: "You are visiting first time",
      });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
});

// Clear cookies
app.get("/clearCookies", (req, res) => {
  res.clearCookie("pageVisited", { path: "/" });
  res.send({ message: "Cookies cleared" });
});

// Generating token demo
app.get("/signin", async (req, res) => {
  const payload = 1234;
  try {
    jwt.sign(
      { data: payload },
      SECRET_KEY,
      { expiresIn: "1h" }, // options
      function (err, data) {
        if (err) {
          throw new Error(err.message);
        }
        res.cookie("token", data, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res.json({
          message: data,
        });
      }
    );
  } catch (err) {
    res.json({ message: err.message });
  }
});
// Verify the generated token
app.get("/verify", (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({
      data: decoded,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

/** Signup */
app.post("/signup", async (req, res) => {
  try {
    const userObject = req.body;
    const user = await User.create(userObject);
    res.json({
      user: user,
      message: "User created successfully",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

/** Sign in */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).send({
        message: "User not found",
      });
    } else {
      if (password === user.password) {
        const token = jwt.sign({ data: user._id }, SECRET_KEY, {
          expiresIn: "1h",
        });
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
        });
        res.status(200).send({
          message: "Login Successful",
          data: user,
        });
      } else {
        res.status(400).json({
          message: "invalid credentials",
        });
      }
    }
  } catch (error) {
    res.status(error.status).send({
      message: error.message,
    });
  }
});

/** Fetch user using id from cookies */
const protectedRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.data);

    if (!user) {
      res.send({
        message: "User not found",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
app.get("/getSignedInUserData", protectedRoute, async (req, res) => {
  res.status(200).json({
    message: "user data fetched",
    data: req.user,
  });
});

app.listen(3000, () => {
  console.log("App listening at port 3000");
});
