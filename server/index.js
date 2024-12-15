const express = require("express");
const mongoose = require("mongoose");
const taskModel = require("./models/task.model");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Inside app.get");
  res.send("From app.get");
});

app.post("/api/tasks", async (req, res) => {
  try {
    const task = await taskModel.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const allTasks = await taskModel.find({});
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findByIdAndUpdate(id, req.body);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await taskModel.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findByIdAndDelete(id);
    res.send(task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(500).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getTaskByDate = async (dateString) => {
  try {
    const startOfDay = new Date(dateString);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(dateString);
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await taskModel.find({
      $or: [
        { createdAt: { $gte: startOfDay, $lte: endOfDay } },
        { updatedAt: { $gte: startOfDay, $lte: endOfDay } },
      ],
    });
    return tasks;
  } catch (error) {
    console.log("Error fetching task: ", error.message);
  }
};

app.get("/api/tasks/:reqDate", async (req, res) => {
  const { reqDate } = req.params;
  temp = await getTaskByDate(reqDate);
  console.log(temp);
  if (temp.length === 0) {
    return res.status(404).json({ message: "No Task for this day" });
  }
  res.status(200).send(temp);
});
// -------------------------------------------------------------------------------------------------------------

mongoose
  .connect(
    "mongodb+srv://bhamaretn:gJ1cu9ZnHK8XObby@taskifydb.amf4b.mongodb.net/Taskify-01?retryWrites=true&w=majority&appName=TaskifyDB"
  )
  .then(() => {
    console.log("Connected to Database");
    app.listen(3000, () => {
      console.log("Hello from Tanish server");
    });
  });
