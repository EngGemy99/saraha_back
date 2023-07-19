import { body, param } from "express-validator";
import userModel from "../../Models/userModel.js";
let signInMethod = [
  body("email").isEmail().withMessage("invalid email 😑"),

  body("password").isString().withMessage("password Must Be Complex 😑"),
];
let signUpMethod = [
  body("name").isString().withMessage("name must be string😑"),
  body("age")
    .isInt({ min: 10, max: 80 })
    .withMessage("Age must be an integer between 10 and 80"),
  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (value) => {
      const user = await userModel.findOne({ email: value });
      if (user) {
        return Promise.reject("Email address already in use😑");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

let checkId = [param("id").isMongoId().withMessage("invalid id 😑")];
export { signInMethod, signUpMethod, checkId };
