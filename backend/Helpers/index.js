const jwt = require("jsonwebtoken");

const decodeToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "No Authorization" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }
    const decoded = jwt.verify(token, "secret_key");
    req.user = decoded.user;
    next();
  } catch (error) {
    // next();
    console.error(error);
    res.status(403).json({ message: "Invalid or expired token", error });
  }
};

const userError = (req, res, next) => {
  return res.status(401).json({ error: "User not found" });
};

module.exports = { decodeToken, userError };
