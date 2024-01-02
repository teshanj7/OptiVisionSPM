const jwt = require("jsonwebtoken");

//jwt token authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "Your_Secret_Token");
    req.userData = {
      email: decodedToken.email,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};

module.exports = authenticate;
