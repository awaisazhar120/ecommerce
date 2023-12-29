import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address ,answer } = req.body;
    if (!name) {
      return res.send({ error: "Name s required." });
    }
    if (!email) {
      return res.send({ error: "email s required." });
    }
    if (!password) {
      return res.send({ error: "password s required." });
    }
    if (!phone) {
      return res.send({ error: "phone s required." });
    }
    if (!address) {
      return res.send({ error: "address s required." });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.send({ error: "email s required." });
    }
    if (!password) {
      return res.send({ error: "password s required." });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Invalid Email." });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({ error: "Invalid Password." });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRECT, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("Protected Route");
  console.log("Protected Route");
};

export const forgotPasswordController = async (req, res) => {
  try {
    const {email, answer, newPassword} = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New password is required" });
    }
    const user = await userModel.findOne({email,answer});
    if(!user){
      res.status(404).send({
        status: false,
        message: "Wrong Email or Answer",
       });
    }
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, {password:hashedPassword});
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
     });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Somethig went wrong",
      error,
    });
  }
};
