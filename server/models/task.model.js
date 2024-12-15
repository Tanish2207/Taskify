const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    taskContent: {
      type: String,
      required: [true, "Please enter task"],
    },

    status: {
      type: Number,
      required: true,
      default: false,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const task = mongoose.model("task", TaskSchema);
module.exports = task;
