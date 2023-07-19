import {
  addMessage,
  deleteMessage,
  getMessageUser,
} from "../Controllers/messageController.js";
import validator from "../MiddleWares/Validations/validator.js";
import express from "express";
import { authMW } from "../MiddleWares/authMW.js";
import {
  addMessageMethod,
  getMessageMethod,
} from "../MiddleWares/Validations/messageValidation.js";

let router = express.Router();
router.post("/addMessage", addMessageMethod, validator, addMessage);
router
  .route("/user")
  .get(authMW, getMessageMethod, validator, getMessageUser)
  .delete(authMW, deleteMessage);
export default router;
