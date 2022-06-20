const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema(
  {
    Project_name: {
      type: String,
      required: true,
    },
    Project_id: {
      type: String,
        required: true,
      unique:true
    },
    Project_status: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    Team_members: {
      type: [""],
      required: true,
    },
    Task_Name: {
      type: [""],
    },
  },

  { timestamps: true }
);
module.exports = model("Project", ProjectSchema);
