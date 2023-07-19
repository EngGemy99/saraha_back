import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    //? الشخص الي ببعتله
    receivedId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("message", messageSchema);
export default messageModel;
