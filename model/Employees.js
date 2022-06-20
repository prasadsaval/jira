const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Employee_id: {
      type: String,
      required: true,
    },
    Employee_email: {
      type: String,
      required: true,
      unique: true,
    },
    Project_Status: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    Project_Name: {
      type: String,
    },
    Task_Name: {
      type: [""],
    },
  },

  { timestamps: true }
);
module.exports = model("Employee", EmployeeSchema);
