const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    Task_name: {
      type: String,
      required: true,
    },
    Task_id: {
      type: String,
      required: true,
      unique: true,
    },
    Project_id: {
      type: String,
      required: true,
    },
    Task_members: {
      type: String,
      required: true,
    },
    Sub_Tasks: {
      type: [""],
    },
    Task_Status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = model("Tasks", TaskSchema);
