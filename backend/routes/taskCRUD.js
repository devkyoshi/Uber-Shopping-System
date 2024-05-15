//CRUD Tested
const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Order = require("../models/order");
const Branch = require("../models/branch");
const User = require("../models/user.model");
const DeliveryData = require("../models/delivery");
const mongoose = require("mongoose");

// Route to find a driver by their driver_id across all branches
router.post("/orders/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;

    // Find all branches
    const branches = await Branch.find();

    let isDriverFound = false;
    let branchId; // Store the branch ID if the driver is found

    // Iterate through each branch to find the driver
    for (const branch of branches) {
      const driver = branch.drivers.find(
        (driver) =>
          driver.driver_id &&
          driver.driver_id.toString() === driverId &&
          driver.availability === "Available"
      );
      if (driver) {
        isDriverFound = true;
        branchId = branch._id; // Store the branch ID
        break;
      }
    }

    if (!isDriverFound) {
      return res
        .status(404)
        .json({ message: "Driver not found or not available in any branch" });
    }

    const driverBranch = await Branch.findOne({
      "drivers.driver_id": driverId,
    });

    const branchIds = driverBranch.branch_ID;

    const driver = await User.findById(driverId);
    const driverName = driver ? driver.Emp_Name : "Driver Name Not Found";

    const driverDistrict = driverBranch.district;
    const driverBranchID = branchId;

    // Find orders where order_district matches driver's district and status is 'pending'
    const orders = await Order.find({
      order_district: driverDistrict,
      order_status: "pending",
    });

    // Filter orders based on payment method
    const filteredOrders = orders.filter((order) => {
      const isCash = order.cash_payment?.payment_method === "cash";
      const isCard = order.card_payment?.payment_method === "card";
      return isCash || isCard;
    });

    const deliveryData = await DeliveryData.findOne();
    const orderCount = deliveryData.order_count;
    const limitedOrders = filteredOrders.slice(0, orderCount);
    // If no matching orders are found
    if (limitedOrders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this driver's district" });
    }

    // Extract orderIds
    const orderIds = limitedOrders.map((order) => order._id);

    // Prepare the document to save to the database
    const dataToSave = {
      driver_id: driverId,
      branch_id: branchIds,
      driver_name: driverName,
      district: driverDistrict,
      orders: orderIds.map((orderId) => ({ order_id: orderId })),
    };

    // Save the document to the database
    const savedData = await Task.create(dataToSave);

    // Update order status for all orders in orderIds array to "Processing"
    await Order.updateMany(
      { _id: { $in: orderIds } },
      { $set: { order_status: "Processing" } }
    );

    // Update driver's availability to "delivering"
    await Branch.updateOne(
      { _id: driverBranchID, "drivers.driver_id": driverId },
      { $set: { "drivers.$.availability": "delivering" } }
    );

    // If saved successfully, return the saved data
    res.json(savedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

///// update task - manage task
router.put("/update-task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { driver_id, branch_id } = req.body;

    // Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update task properties if provided in the request body
    if (!driver_id) {
      return res.status(400).json({ error: "Driver ID is required" });
    }

    // Find the driver by driver_id to get the driver_name
    const driverUser = await User.findById(driver_id);
    if (!driverUser) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Update driver name on the task
    task.driver_id = driver_id;
    task.driver_name = driverUser.Emp_Name;

    const updateResult = await Branch.updateOne(
      { branch_ID: branch_id, "drivers.driver_id": driver_id }, // Use branch_ID instead of _id
      { $set: { "drivers.$.availability": "delivering" } }
    );

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the task" });
  }
});

router.get("/:branch_ID/driver-all", async (req, res) => {
  try {
    const { branch_ID } = req.params;

    // Find branch data
    const branchData = await Branch.findOne({ branch_ID });
    if (!branchData) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Filter drivers based on availability
    const availableDrivers = branchData.drivers.filter(
      (driver) => driver.availability === "Available"
    );
    if (availableDrivers.length === 0) {
      return res.status(404).json({ error: "No available drivers found" });
    }

    // Extract driver IDs
    const driverIds = availableDrivers.map((driver) => driver.driver_id);

    // Fetch user data for the filtered drivers
    const drivers = await User.find({ _id: { $in: driverIds } });

    // Extract relevant information for each driver
    const driverInfo = drivers.map((driver) => ({
      driverName: driver ? driver.Emp_Name : "Driver Name Not Found",
      driverId: driver ? driver._id : null,
      // Include other relevant driver information here
    }));

    res.json(driverInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching drivers from the branch",
    });
  }
});

// Add pickup details within a task(new) - Gimashi
router.put("/add-pickup/:taskId/:orderId", async (req, res) => {
  try {
    const { taskId, orderId } = req.params;
    const { status, pickup_image_url } = req.body;

    // Find the task by taskId
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Find the order within the task's orders array
    const order = task.orders.find((order) => order._id.toString() === orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update order details if provided in the request
    if (status) {
      order.status = status;
    }
    if (pickup_image_url) {
      order.pickup_image_url = pickup_image_url;
    }

    // Automatically set pickedup_time to current date and time
    order.pickedup_time = Date.now();

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
});

// Update pickup details within a task - Gimashi
router.put("/update-pickup/:taskId/:orderId", async (req, res) => {
  try {
    const { taskId, orderId } = req.params;
    const { status, pickup_image_url, pickedup_time } = req.body;

    // Find the task by taskId
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Find the order within the task's orders array
    const order = task.orders.find((order) => order._id.toString() === orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update order details if provided in the request
    if (status) {
      order.status = status;
    }
    if (pickup_image_url) {
      order.pickup_image_url = pickup_image_url;
    }
    if (pickedup_time) {
      order.pickedup_time = pickedup_time;
    }

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
});

// Delete pickup within a task
router.delete("/delete-pickup/:taskId/:orderId", async (req, res) => {
  try {
    const { taskId, orderId } = req.params;

    // Find the task by taskId
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Find the index of the order within the task's orders array
    const orderIndex = task.orders.findIndex(
      (order) => order._id.toString() === orderId
    );

    if (orderIndex === -1) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Remove the order from the task's orders array
    task.orders.splice(orderIndex, 1);

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the order" });
  }
});

// Add delivered details within a task -  Gimashi
router.put("/add-delivered/:taskId/:orderId", async (req, res) => {
  try {
    const { taskId, orderId } = req.params;
    const { status, delivered_image_url } = req.body;

    // Find the task by taskId
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Find the order within the task's orders array
    const order = task.orders.find((order) => order._id.toString() === orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update delivered details if provided in the request
    if (status) {
      order.status = status;
    }
    if (delivered_image_url) {
      order.delivered_image_url = delivered_image_url;
    }

    // Automatically set delivered_time to current date and time
    order.delivered_time = Date.now();

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
});

// Update delivered details within a task - Gimashi
router.put("/update-delivered/:taskId/:orderId", async (req, res) => {
  try {
    const { taskId, orderId } = req.params;
    const { status, delivered_image_url } = req.body;

    // Find the task by taskId
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Find the order within the task's orders array
    const order = task.orders.find((order) => order._id.toString() === orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update delivered details if provided in the request
    if (status) {
      order.status = status;
    }
    if (delivered_image_url) {
      order.delivered_image_url = delivered_image_url;
    }

    // Automatically set delivered_time to current date and time
    order.delivered_time = Date.now();

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
});

// Delete delivered details within a task - Gimashi
router.delete("/delete-delivered/:taskId/:orderId", async (req, res) => {
  try {
    const { taskId, orderId } = req.params;

    // Find the task by taskId
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Find the index of the order within the task's orders array
    const orderIndex = task.orders.findIndex(
      (order) => order._id.toString() === orderId
    );

    if (orderIndex === -1) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Remove the delivered details from the order
    const order = task.orders[orderIndex];
    order.status = null;
    order.delivered_image_url = null;
    order.delivered_time = null;

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while deleting the delivered details",
    });
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

// use for task table
router.get("/tasks", async (req, res) => {
  try {
    // Fetch all tasks and populate the orders field
    const tasks = await Task.find().populate("orders.order_id");

    // Map tasks to include task_id along with other fields
    const tasksWithId = tasks.map((task) => ({
      task_id: task._id,
      branch_id: task.branch_id,
      driver_id: task.driver_id,
      driver_name: task.driver_name,
      district: task.district,
      orders: task.orders,
    }));

    res.json(tasksWithId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching tasks" });
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
    res.status(500).json({
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
    res.status(500).json({
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
