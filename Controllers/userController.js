import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Emails/Emails.js";
import { catchError } from "../utils/catchAsyncError.js";
import cloudinary from "../utils/cloudinary.js";

const signUp = catchError(async (request, response, next) => {
  let { name, password, email, age } = request.body;
  //! first way to handle if user did not send image or send another file type
  if (request.file === undefined) {
    let error = new Error("upload Image Only 🙄");
    error.status = 400;
    return next(error);
  }
  //? Start to upload image in cloudinary
  let { public_id, secure_url } = await cloudinary.uploader.upload(
    request.file.path,
    { folder: "Saraha_Project" }
  );
  //? End to upload image in cloudinary
  const hash = bcrypt.hashSync(password, 8);
  await userModel.insertMany({
    name,
    email,
    age,
    password: hash,
    profilePic: secure_url,
  });

  response.status(201).json({
    message: "sign up successfully👌",
  });
  sendEmail({ email });
});
const signIn = catchError(async (request, response, next) => {
  const { email, password } = request.body;
  const user = await userModel.findOne({ email }); // {} or null
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Email or Password Incorrect 🙄");
    error.status = 403;
    return next(error);
  }
  const token = jwt.sign(
    {
      user,
    },
    process.env.KEY
  );
  response.status(200).json({
    message: "Login 🌹",
    token,
    user,
  });
});

const verifyEmail = catchError(async (request, response, next) => {
  let { token } = request.params;
  jwt.verify(token, process.env.EmailKey, async (error, decoded) => {
    if (error) {
      return next(error);
    } else {
      await userModel.findOneAndUpdate(
        { email: decoded.email },
        {
          confirmedEmail: true,
        }
      );
      response.status(200).json({
        message: "Done 😎",
      });
    }
  });
});

const userData = catchError(async (request, response, next) => {
  let { id } = request.params;
  const user = await userModel.findById(id);
  response.status(200).json({
    user,
  });
});

export { signIn, signUp, verifyEmail, userData };

//! to remove old photo profile from cloudinary do this
//? profileImageId : i store it first time when signUp and after that delete it when update
// cloudinary.uploader.destroy(user.profileImageId)
// profileImageId get it from database it store it when added
