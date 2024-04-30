//CRUD Tested
const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Order = require("../models/order");
const mongoose = require("mongoose");

// Add a new task(new) - Sarindu
router.post("/add-task", async (req, res) => {
  try {
    const { driver_id, branch_id, district, orderIds } = req.body;
    const task = new Task({ driver_id, branch_id, district });

    // Push each orderId into the orders array
    if (orderIds && Array.isArray(orderIds)) {
      orderIds.forEach(async (orderId) => {
        task.orders.push({ order_id: orderId });

        // Update order status to "processing"
        await Order.updateOne({ _id: orderId }, { $set: { order_status: "Processing" } });
      });

      // Update driver's availability to "delivering"
      // await Branch.updateOne(
      //   { _id: branch_id, "drivers.driver_id": driver_id },
      //   { $set: { "drivers.$.availability": "delivering" } }
      // );
    }
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the task" });
  }
});


 ///// update task - manage task
router.put("/update-task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { driver_id, branch_id, district, orderIds } = req.body;

    // Find the task by ID
    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update task properties if provided in the request body
    if (driver_id) {
      task.driver_id = driver_id;
    }
    if (branch_id) {
      task.branch_id = branch_id;
    }
    if (district) {
      task.district = district;
    }

    // Update orderIds if provided, and update order status to "Processing"
    if (orderIds && Array.isArray(orderIds)) {
      // Clear existing orders
      task.orders = [];

      // Update order status to "Processing" for each order
      for (const orderId of orderIds) {
        task.orders.push({ order_id: orderId });
        await Order.updateOne({ _id: orderId }, { $set: { order_status: "Processing" } });
      }
    }

    // Save the updated task
    task = await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the task" });
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
    res
      .status(500)
      .json({
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
    const tasks = await Task.find().populate('orders.order_id');

    // Map tasks to include task_id along with other fields
    const tasksWithId = tasks.map(task => ({
      task_id: task._id,
      branch_id: task.branch_id,
      driver_id: task.driver_id,
      district: task.district,
      orders: task.orders
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



  // using for task view - driver UI

  // router.get('/:taskId/details', async (req, res) => {
  //   try {
  //     const { taskId } = req.params;
  
  //     // Find the task by ID and populate the orders field
  //     const task = await Task.findById(taskId).populate({
  //       path: 'orders',
  //       populate: {
  //         path: 'order_id',
  //         populate: {
  //           path: 'customer_id',
  //         select: ' phone nearest_town', // Select only required fields
  //         },
  //         select: 'order_id status', // Select only required fields
  //       },
  //     });
   
  //     // Check if the task exists
  //     if (!task) {
  //       return res.status(404).json({ message: 'Task not found' });
  //     }
  
  //     // Extract customer details, nearest town, customer name, and order ID from the populated task
  //     const taskDetails = {
  //       customer: task.orders.map(order => ({
  //         //name: order.order_id.customer_id.name,
  //         phone: order.order_id.customer_id.phone,
  //         nearest_town: order.order_id.customer_id.nearest_town,
  //         orderId: order.order_id._id,
  //       })),
  //     };
  
  //     res.json(taskDetails);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Server Error' });
  //   }
  // });
  

module.exports = router;
