const express = require("express");
const fileUpload = require("../middleware/fileUpload");
const { check } = require("express-validator");
const router = express.Router();
const usersControllers = require("../controllers/users-controllers");

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5, max: 16 }),
  ],
  usersControllers.signUp
);

router.post("/login", usersControllers.login);

module.exports = router;
