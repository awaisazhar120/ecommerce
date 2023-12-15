import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'Authorization token is missing',
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRECT);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({
        success: false,
        message: 'Token has expired',
      });
    }

    return res.status(401).send({
      success: false,
      message: 'Invalid token',
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error in middleware',
    });
  }
};
