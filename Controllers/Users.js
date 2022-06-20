const AuthSchema = require("../model/User.js");

const bcrypt = require("bcryptjs");




exports.Signup = async (req, res) => {
  try {
    console.log(req.body);
    let { username, password, email, role } = req.body;
    let payload = new AuthSchema({
      username,
      password,
      email,
      role,
    });
    let data = await AuthSchema.create(payload);
    let TOKEN = await data.getJWTtoken();
    // console.log(TOKEN);
    res.status(201).json({ message: "successfully user registered", TOKEN });
  } catch (err) {
    if (err) throw err;
    res.status(501).json({ message: "server error" });
  }
};

exports.SignIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ message: "EMAIL AND PASSWORD REQUIRED" });
    }
    // CHECK YOUR EXIST OR NOT
    //fetching data from database
    let user = await AuthSchema.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "EMAIL NOT EXIST IN OUR DATABASE" });
    }
    // compare password

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(501).json({ message: "SERVER ERROR" });
    }
    res.status(201).json({ message: "successfully logged in" });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    error(err);
  }
};

function sendTokenResponse(user, statusCode, res) {
  let token = user.getJWTtoken();
  let options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ messages: "succesfully stored", token });
}

exports.getMe = async (req, res, next) => {
  try {
    let user = await AuthSchema.findById(req.user.id);
    res.status(200).json({ message: "successfully fetched", user });
    next();
  } catch (err) {
    res.status(501).json({ message: "SERVER ERROR" });
  }
};
