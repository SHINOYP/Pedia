const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//Protected Routes token base
const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Autherization token requires" });
  }

  try {
    const decode = jwt.verify(authorization, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request not autherized" });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.roll === 0) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorised Accesss",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error: error,
      message: "error in admin middleware",
    });
  }
};

module.exports = { requireAuth, adminAuth };
