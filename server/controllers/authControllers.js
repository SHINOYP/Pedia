const express = require("express");
const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");
const orderModel = require("../models/orderModel");
const signUp = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validations
    if (!name || !email || !password || !phone || !address) {
      return res.send({ error: "All fileds must be filled" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }

    //hash
    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email is not registerd",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        token: token,
        role: user.roll,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Log in",
      error,
    });
  }
};

const test = (req, res) => {
  res.send("proteced route");
};

const getOrdersController = async (req, res) => {
  try {
    const order = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};

module.exports = { signUp, logIn, test, getOrdersController };
