import { body, query } from "express-validator";
let addMessageMethod = [
  body("message").isString().withMessage("Send Any Message 😑"),
  body("receivedId").isMongoId().withMessage("invalid id 😑"),
];
let getMessageMethod = [
  query("page")
    .custom((value) => {
      if (!value || value < 1 || !Number.isInteger(+value)) {
        throw new Error("Page number must be a positive integer");
      }
      return true;
    })
    .optional(),
];

export { addMessageMethod, getMessageMethod };
