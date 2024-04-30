//CRUD test => pass 31.03.24

//import the Express framework and create a router
const express = require("express");
const router = express.Router();

//Import models
const Branch = require("../models/branch");
const Task = require("../models/task");
const mongoose = require("mongoose");
const Order = require("../models/order");
const Supermarket = require("../models/supermarkets");
const Customer = require("../models/customer/customer_register_schema");

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

    //Adds the new driver to the branch's drivers array and saves the branch in the database.
    branch.drivers.push(newDriver);
    await branch.save();

    //Sends a JSON response indicating successful driver addition.
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
      available_district,
      current_handover_money,
      vehicle_number,
      availability,
    } = req.body; // Extracting data directly from req.body

    const branch = await Branch.findOne({ branch_ID: branchID }); // Find branch by branch_ID

    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    const driverIndex = branch.drivers.findIndex((driver) => {
      console.log("Driver object:", driver);
      return driver._id && driver._id.toString() === driverID;
    });

    if (driverIndex === -1) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Update the driver properties directly
    branch.drivers[driverIndex] = {
      ...branch.drivers[driverIndex],
      available_district,
      current_handover_money,
      vehicle_number,
      availability,
    };

    await branch.save();

    res.json("Driver updated in branch");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the driver in the branch",
    });
  }
});

// Remove a driver from a specific branch - Gimashi
// router.delete("/:branchID/driver-delete/:driverID", async (req, res) => {
//   try {
//     const { branchID, driverID } = req.params;

//     const branch = await Branch.findOne({ branch_ID: branchID }); // Find branch by branch_ID

//     if (!branch) {
//       return res.status(404).json({ error: "Branch not found" });
//     }

//     const updatedDrivers = branch.drivers.filter(
//       (driver) => driver.driver_id !== driverID
//     );

//     if (updatedDrivers.length === branch.drivers.length) {
//       return res.status(404).json({ error: "Driver not found in branch" });
//     }

//     branch.drivers = updatedDrivers;
//     await branch.save();

//     res.json("Driver deleted from branch");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "An error occurred while deleting the driver from the branch",
//     });
//   }
// });
router.delete("/:branchID/driver-delete/:driverID", async (req, res) => {
  try {
    const { branchID, driverID } = req.params;

    const result = await Branch.updateOne(
      { branch_ID: branchID },
      { $pull: { drivers: { driver_id: driverID } } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: "Driver not found in branch" });
    }

    res.json("Driver deleted from branch");
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
        const customerDetails = await getCustomerDetails(orderId);
        // Add task and order information to the array
        detailedOrders.push({
          order_details: orderDetails,
          customer_details: customerDetails,
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

// Function to retrieve detailed customer information
async function getCustomerDetails(orderId) {
  try {
    // Find the order by order ID
    const order = await getOrderDetails(orderId); // Corrected function name

    if (!order) {
      // Handle case where order is not found
      throw new Error("Order not found");
    }

    // Extract the customer ID from the order
    const customerId = order.customer_id;

    // Find the customer by customer ID
    const customer = await Customer.findById(customerId);

    if (!customer) {
      // Handle case where customer is not found
      throw new Error("Customer not found");
    }

    // Extract and return relevant customer details
    const { cus_name, cus_cnumber, cus_address } = customer;
    return { cus_name, cus_cnumber, cus_address };
  } catch (error) {
    console.error("Error fetching order and customer details:", error);
    throw new Error("Failed to fetch order and customer details");
  }
}

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
