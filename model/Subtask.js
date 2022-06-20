const { Schema, model } = require("mongoose");

const Sub_TaskSchema = new Schema(
  {
    Sub_Task_name: {
      type: String,
      required: true,
    },
    Sub_Task_id: {
      type: String,
      required: true,
      unique: true,
    },
    Project_id: {
      type: String,
      required: true,
    },
    Task_id: {
      type: String,
      required: true,
      unique: true,
    },

    Task_Status: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);
module.exports = model("Sub_Tasks", Sub_TaskSchema);
