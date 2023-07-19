import { validationResult } from "express-validator";
//? this way to send all error as string to last middle ware and send it as string to front end
export default (request, response, next) => {
  let result = validationResult(request);
  if (result.errors.length != 0) {
    let errorString = result.errors.reduce((current, object) => {
      return current + object.msg + ",";
    }, " ");
    let error = new Error(errorString);
    error.status = 422;
    next(error);
  } else {
    next();
  }
};

//? this way to send all error as array to iteration on it in front end
// export default (request, response, next) => {
//   let result = validationResult(request);
//   if (!result.isEmpty()) {
//     const errorArray = result.array().map((error) => ({
//       message: error.msg,
//     }));
//     return response.status(422).json({ errors: errorArray });
//   } else {
//     next();
//   }
// };
