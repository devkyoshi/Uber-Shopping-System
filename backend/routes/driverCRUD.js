//CRUD test => pass 31.03.24

const express = require("express");
const router = express.Router();
const Branch = require("../models/branch");
const Task = require("../models/task");
const mongoose = require("mongoose");
const Order = require("../models/order");
const Supermarket = require("../models/supermarkets");

// Add drivers to a specific branch - Gimashi
router.post("/:branchID/driver-add", async (req, res) => {
  try {
    const { branchID } = req.params;
    const {
      driver_id,
      current_handover_money,
      vehicle_number,
      availability,
      //   driver_longitude,
      //   driver_latitude,
      available_district,
    } = req.body;

    const branch = await Branch.findOne({ branch_ID: branchID }); // Find branch by branch_ID

    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    const newDriver = {
      driver_id,
      current_handover_money,
      vehicle_number,
      availability,
      //   driver_longitude,
      //   driver_latitude,
      available_district,
    };

    branch.drivers.push(newDriver);
    await branch.save();

    res.json("Driver added to branch");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding the driver to the branch",
    });
  }
});

// Update driver details within a branch - Gimashi
router.put("/:branchID/driver-update/:driverID", async (req, res) => {
  try {
    const { branchID, driverID } = req.params;

    const {
      current_handover_money,
      vehicle_number,
      availability,
      // driver_longitude,
      // driver_latitude,
      available_district,
    } = req.body;

    // Find the branch by branchID
    const branch = await Branch.findById(branchID);

    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Find the index of the driver within the branch's drivers array
    const driverIndex = branch.drivers.findIndex(
      (driver) => driver.driver_id.toString() === driverID
    );

    if (driverIndex === -1) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Update driver details if provided in the request
    if (current_handover_money !== undefined) {
      branch.drivers[driverIndex].current_handover_money =
        current_handover_money;
    }
    if (vehicle_number !== undefined) {
      branch.drivers[driverIndex].vehicle_number = vehicle_number;
    }
    if (availability !== undefined) {
      branch.drivers[driverIndex].availability = availability;
    }
    //   if (driver_longitude !== undefined) {
    //     branch.drivers[driverIndex].driver_longitude = driver_longitude;
    //   }
    //   if (driver_latitude !== undefined) {
    //     branch.drivers[driverIndex].driver_latitude = driver_latitude;
    //   }
    if (available_district !== undefined) {
      branch.drivers[driverIndex].available_district = available_district;
    }

    // Save the updated branch
    await branch.save();

    res.json({ message: "Driver details updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "An error occurred while updating the driver details within the branch",
    });
  }
});

// Remove a driver from a specific branch - Gimashi
router.delete("/:branchID/driver-delete/:driverID", async (req, res) => {
  try {
    const { branchID, driverID } = req.params;

    const branch = await Branch.findById(branchID);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    const driverIndex = branch.drivers.findIndex(
      (driver) => driver.driver_id.toString() === driverID.toString()
    );
    if (driverIndex === -1) {
      return res.status(404).json({ error: "Driver not found in branch" });
    }

    branch.drivers.splice(driverIndex, 1);
    await branch.save();

    res.json("Driver deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while deleting the driver from the branch",
    });
  }
});

// Route to get all drivers in a branch by branch_ID
router.get("/drivers/:branchId", async (req, res) => {
  const { branchId } = req.params;

  try {
    // Find the branch by branch_ID and populate the 'drivers' field
    const branch = await Branch.findOne({ branch_ID: branchId }).populate(
      "drivers"
    );

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // Return the drivers belonging to the branch
    res.json({ drivers: branch.drivers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// read all driver from a specific branch - Gimashi
router.get("/:branchID/driver-all", async (req, res) => {
  try {
    const { branchID } = req.params;

    const branch = await Branch.findById(branchID);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    res.json(branch.drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching drivers from the branch",
    });
  }
});

// get all drivers [from all branches]
router.get("/drivers", async (req, res) => {
  try {
    const driversWithBranchID = await Branch.aggregate([
      { $unwind: "$drivers" },
      {
        $lookup: {
          from: "drivers", // Assuming the name of the drivers collection is "drivers"
          localField: "drivers.driver_id",
          foreignField: "_id", // Assuming the driver_id is the _id in the drivers collection
          as: "driver_info",
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id
          driver_id: "$drivers.driver_id",
          branch_ID: "$branch_ID",
          available_district: "$drivers.available_district",
          availability: "$drivers.availability",
        },
      },
    ]);

    res.json(driversWithBranchID);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/tasks/:driverId", async (req, res) => {
  const { driverId } = req.params;

  try {
    // Query the Task collection for tasks with the specified driver ID
    const tasks = await Task.find({ driver_id: driverId });

    // Check if any tasks were found
    if (tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found for the specified driver ID." });
    }

    // Initialize common task information
    const commonTaskInfo = {
      task_id: tasks[0]._id, // Assuming all tasks have the same _id
      driver_id: tasks[0].driver_id,
      district: tasks[0].district,
    };

    // Array to store detailed order information
    const detailedOrders = [];

    // Iterate through each task
    for (const task of tasks) {
      // Iterate through each order in the task
      for (const order of task.orders) {
        const orderId = order.order_id;
        // Retrieve detailed order information using the order ID
        const orderDetails = await getOrderDetails(orderId);
        // Add task and order information to the array
        detailedOrders.push({
          order_details: orderDetails,
        });
      }
    }

    // Return detailed order information with common task info
    const response = {
      ...commonTaskInfo,
      orders: detailedOrders,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching tasks/orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Function to retrieve detailed order information
async function getOrderDetails(orderId) {
  try {
    // Retrieve the order details using the order ID
    const order = await Order.findById(orderId);

    if (!order) {
      return { order_id: orderId, message: "Order not found." };
    }

    const orderItems = order.items;

    // Create an array to store detailed item information
    const detailedItems = [];

    // Iterate through each item in the order
    for (const orderItem of orderItems) {
      // Extract the item ID and quantity
      const { item_id, quantity } = orderItem;

      // Search the Supermarket schema to find the associated item details
      const supermarketItem = await Supermarket.findOne({
        "items._id": item_id,
      });

      if (supermarketItem) {
        // Find the item within the supermarket item
        const itemDetails = supermarketItem.items.find((item) =>
          item._id.equals(item_id)
        );

        // Extract relevant information
        const { item_name, price } = itemDetails;
        const { sm_name } = supermarketItem;

        // Add detailed item information to the array
        detailedItems.push({
          item_id,
          quantity,
          item_name,
          price,
          sm_name,
        });
      }
    }

    // Return detailed item information
    return { order_id: orderId, items: detailedItems };
  } catch (error) {
    console.error("Error fetching order items:", error);
    return { order_id: orderId, message: "Server error" };
  }
}

module.exports = router;
