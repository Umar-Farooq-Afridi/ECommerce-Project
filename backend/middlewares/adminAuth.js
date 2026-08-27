import jwt from "jsonwebtoken";

const adminAuth = async (request, response, next) => {
  try {
    const { token } = request.headers;
    if (!token) {
      return response
        .status(404)
        .json({ success: false, message: "Not Authorized. Login Again." });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return response
        .status(400)
        .json({ success: false, message: "Not Authorized. Login Again." });
    }

    next();
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
};

export default adminAuth;
