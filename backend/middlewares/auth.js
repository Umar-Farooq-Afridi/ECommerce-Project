import jwt from "jsonwebtoken";

const authUser = async (request, response, next) => {
  const { token } = request.headers;
  if (!token) {
    return response
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    request.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
};

export default authUser;
