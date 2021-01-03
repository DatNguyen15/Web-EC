const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");
const { Mailer } = require("./mailer");

const { Mail } = require("./mailer");

exports.signup = (req, res) => {
  console.log("req.body", req.body);

  const user = new User(req.body);
  const { name, email, password } = req.body;
  User.findOne({ email }, (err, check) => {
    if (err || check) {
      return res.status(400).json({
        error: "Email already  exists !!!",
      });
    }
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }

      //Mail(user);
      user.salt = undefined;
      user.hasshed_password = undefined;
      res.json({
        user,
      });
    });
  });
};

exports.signin = (req, res) => {
  //find the user based on email
  const { email, password } = req.body; //khai báo email password nhận từ body
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    //if user id found make sure email pass match
    //create authenticate method user MODEL
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match",
      });
    }
    if (!user.isActive) {
      return res.status(501).json({
        error: "This account is blocked",
      });
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persit the token as 't' cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    //return perponse with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Success" });
};
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};

exports.isAdminToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  const token = authorization.split(" ")[1];

  const decoded = jwt.decode(token, process.env.JWT_SECRET);

  const userId = decoded._id;

  const user = User.findById(userId)
    .then((user) => {
      next();
    })
    .catch((error) => {
      if (user && user.role !== 1) {
        return res.status(401).json({ error: "Not Authorization " + error });
      }
    });
};
