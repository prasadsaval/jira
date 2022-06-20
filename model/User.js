//!--------------------------------------
const { Schema, model } = require("mongoose");
const bcrypt = require(`bcryptjs`);
const jwt = require("jsonwebtoken");
const { JWT_EXPIRE, JWT_SECRET } = require("../configs/db");
const AuthSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "please add username"],
      minlength: [6, "username should be minimum 6 characters"],
    },

    password: {
      type: String,
      required: [true, "please add your password"],
      minlength: 6,
      select: false,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "please add email address"],

      match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    role: {
      type: String,
      enum: ["user", "publisher"],
      default: "user",
    },
  },
  { timestamps: true }
);
AuthSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//way to create schema schema custom method.............................
AuthSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};
module.exports = model("user", AuthSchema);
