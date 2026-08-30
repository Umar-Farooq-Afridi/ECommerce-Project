import jwt from "jsonwebtoken";

const adminAuth = async (request, response, next) => {
  try {
    const { token } = request.headers;
    if (!token) {
      return response
        .status(401)
        .json({ success: false, message: "Not Authorized. Login Again." });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return response
        .status(401)
        .json({ success: false, message: "Not Authorized. Login Again." });
    }

    next();
  } catch (error) {
    console.log(error);
    response.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
