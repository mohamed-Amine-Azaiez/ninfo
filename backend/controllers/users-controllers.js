const User = require("../models/User");
const fs = require("fs");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const signUp = async (req, res, next) => {
  const { email, name, password } = req.body;
  console.log(req.file);
  let exisitingUser;
  try {
    exisitingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("something went wrong 1", 500);
    return next(error);
  }
  if (exisitingUser) {
    return next(new HttpError("user already exist", 422));
  }
  const createUser = new User({
    email,
    password,
    name,
    image: req.file.path,
  });
  try {
    await createUser.save();
  } catch (err) {
    const error = new HttpError("something went wrong 2", 500);
    return next(error);
  }
  res.status(200).json(createUser.toObject({ getters: true }));
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let concernedUser;
  try {
    concernedUser = await User.findOne({ email, password });
  } catch (err) {
    const error = new HttpError("something went wrong", 500);
  }
  if (!concernedUser) {
    return next(new HttpError("credentials are wrong", 401));
  }
  res.status(200).json(concernedUser.toObject({ getters: true }));
};

exports.signUp = signUp;
exports.login = login;
