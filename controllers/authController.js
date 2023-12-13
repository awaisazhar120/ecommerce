import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
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

    const existingUser = await existingUserModel.findOne({email});

    if(existingUser){
        return res.status(200).send({
            success:true,
            message:"User already exists"
        });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({name,email,phone,address,password:hashedPassword});

    res.status(201).send({
        success:true,
        message:"User registered successfully",
        user
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error",
      error,
    });
  }
};
