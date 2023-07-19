import jwt from "jsonwebtoken";

const authMW = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.KEY, (error, decoded) => {
    if (error) {
      next(error);
    } else {
      request.userData = decoded;
      request.userId = decoded.user._id;
      next();
    }
  });
};

export { authMW };
