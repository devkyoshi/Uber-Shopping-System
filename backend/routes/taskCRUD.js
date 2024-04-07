//CRUD Tested
const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const mongoose = require("mongoose");

// Add a new task
router.post("/add-task", async (req, res) => {
  try {
    const { driver_id, task_status, route } = req.body;
    const task = new Task({ driver_id, task_status, route });
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the task" });
  }
});

// Update a task
router.put("/update-task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { driver_id, task_status, route } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { driver_id, task_status, route },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the task" });
  }
});

// Delete a task
router.delete("/delete-task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json("Task deleted successfully");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the task" });
  }
});

// Get a specific task
router.get("/get-task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the task" });
  }
});

// Get all tasks
router.get("/get-all-tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching all tasks" });
  }
});

// Add order details to a specific task
router.post("/:taskId/add-order", async (req, res) => {
  try {
    const { taskId } = req.params;
    const {
      order_id,
      status,
      pickup_image_url,
      delivered_image_url,
      delivered_time,
      pickedup_time,
    } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const newOrder = {
      order_id,
      status,
      pickup_image_url,
      delivered_image_url,
      delivered_time,
      pickedup_time,
    };

    task.orders.push(newOrder);
    await task.save();

    res.json("Order details added to task");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "An error occurred while adding order details to the task",
      });
  }
});

// Update order details for a specific task
router.put("/:taskId/update-order/:orderId", async (req, res) => {
  try {
    const { taskId, orderId } = req.params;
    const {
      status,
      pickup_image_url,
      delivered_image_url,
      delivered_time,
      pickedup_time,
    } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const order = task.orders.find((order) => order._id == orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found in the task" });
    }

    order.status = status || order.status;
    order.pickup_image_url = pickup_image_url || order.pickup_image_url;
    order.delivered_image_url =
      delivered_image_url || order.delivered_image_url;
    order.delivered_time = delivered_time || order.delivered_time;
    order.pickedup_time = pickedup_time || order.pickedup_time;

    await task.save();

    res.json("Order details updated successfully");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating order details" });
  }
});

// Remove order from a specific task
router.delete("/:taskId/remove-order/:orderId", async (req, res) => {
  try {
    const { taskId, orderId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const orderIndex = task.orders.findIndex((order) => order._id == orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ error: "Order not found in the task" });
    }

    task.orders.splice(orderIndex, 1);
    await task.save();

    res.json("Order removed from task");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while removing order from the task" });
  }
});

// Get all orders for a specific task
router.get("/:taskId/get-all-orders", async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task.orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching all orders for the task",
      });
  }
});

// Get a specific order from a specific task
router.get("/:taskId/get-order/:orderId", async (req, res) => {
  try {
    const { taskId, orderId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const order = task.orders.find((order) => order._id == orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found in the task" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the order" });
  }
});

module.exports = router;
