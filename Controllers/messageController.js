import messageModel from "../Models/messageModel.js";

const addMessage = async (request, response, next) => {
  try {
    await messageModel.insertMany(request.body);
    response.status(200).json({
      message: "Send Successfully 👋",
    });
  } catch (error) {
    next(error);
  }
};
const getMessageUser = async (request, response, next) => {
  try {
    let pageNumber = request.query.page;
    //? if user send string in url
    pageNumber = pageNumber * 1 || 1;
    if (pageNumber <= 0 || !pageNumber) pageNumber = 1;
    let LIMIT = 5;
    let skip = (pageNumber - 1) * LIMIT;
    //! catch id from token
    const receivedId = request.userId;
    let totalCount = await messageModel.countDocuments({ receivedId });
    let pages = Math.ceil(totalCount / LIMIT);
    let data = await messageModel
      .find({ receivedId })
      .skip(skip)
      .limit(LIMIT)
      .sort("-createdAt");
    response.status(200).json({
      data,
      pageNumber,
      totalCount,
      pages,
    });
  } catch (error) {
    next(error);
  }
};
const deleteMessage = async (request, response, next) => {
  try {
    const { id } = request.body;
    await messageModel.findByIdAndDelete(id);
    response.status(200).json({
      message: "Delete Successfully 🧺",
    });
  } catch (error) {
    next(error);
  }
};

export { addMessage, getMessageUser, deleteMessage };
