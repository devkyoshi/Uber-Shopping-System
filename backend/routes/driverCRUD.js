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
const User = require("../models/user.model");

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

    // Search for the user by driver_id and update Emp_type to "driver"
    await User.findOneAndUpdate({ _id: driver_id }, { Emp_type: "driver" });

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

//-------------------------------------------------------------previous method
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


// router.delete("branches/:branchId/driver-delete/:driverId", async (req, res) => {
//   const { branchId, driverId } = req.params;

//   try {
//     // Find the branch by branch_ID
//     const branch = await Branch.findOne({ branch_ID: branchId });

//     if (!branch) {
//       return res.status(404).json({ message: "Branch not found" });
//     }

//     // Find the index of the driver with driver_id in the drivers array
//     const driverIndex = branch.drivers.findIndex(
//       (driver) => String(driver.driver_id) === driverId
//     );

//     if (driverIndex === -1) {
//       return res.status(404).json({ message: "Driver not found in this branch" });
//     }

//     // Remove the driver from the drivers array
//     branch.drivers.splice(driverIndex, 1);
//     await branch.save();

//     res.json({ message: "Driver removed from branch successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

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

// Route to get all available employees(Available employees to add as a driver)
router.get("/available-drivers", async (req, res) => {
  try {
    const availableEmployees = await User.find({
      Emp_type: "available_employee",
    });
    res.json(availableEmployees);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    const branches = await Branch.find().populate({
      path: "drivers",
      select: "driver_id branch_ID available_district availability",
      populate: {
        path: "driver_id",
        select: "Emp_Name",
      },
    });

    const driversData = branches.reduce((acc, branch) => {
      branch.drivers.forEach((driver) => {
        if (driver.driver_id && driver.driver_id.Emp_Name) {
          acc.push({
            driver_id: driver.driver_id._id,
            Emp_Name: driver.driver_id.Emp_Name,
            branch_ID: branch.branch_ID,
            available_district: driver.available_district,
            availability: driver.availability,
          });
        }
      });
      return acc;
    }, []);

    res.json(driversData);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get driver tasks and order details
router.get("/tasks/:driverId", async (req, res) => {
  const driverId = req.params.driverId;
  try {
    // Query the first task with the specified driver ID and populate the "orders" field with order details
    const task = await Task.findOne({ driver_id: driverId }).populate({
      path: "orders.order_id",
      model: "Order",
      select: "order_details customer_id", // Include customer_id in the selection
    });

    // Check if a task exists for the given driver ID
    if (!task) {
      return res
        .status(404)
        .json({ message: "No task found for the provided driver ID." });
    }

    // Initialize an array to store tasks with order details
    const tasksWithOrderDetails = [];

    // Initialize an array to store order details for the task
    const ordersDetails = [];

    // Iterate over each order in the task
    for (const order of task.orders) {
      const orderId = order.order_id._id; // Get the order ID

      // Find the order
      const foundOrder = await Order.findById(orderId);
      if (!foundOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Find the customer details for the order
      const customer = await Customer.findById(foundOrder.customer_id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      // Initialize an array to store details for each item in the order
      const itemsDetails = [];

      // Iterate over each item in the order
      for (const orderItem of foundOrder.items) {
        const item_Id = orderItem.item_id;

        // Find the supermarket containing the item
        const supermarket = await Supermarket.findOne({
          "items._id": item_Id,
        });
        if (!supermarket) {
          itemsDetails.push({
            item_name: "Unidentified",
            price: "Unidentified",
            sm_name: "Supermarket Removed",
            quantity: orderItem.quantity,
          });
          continue; // Continue to the next iteration
          // return res
          //   .status(404)
          //   .json({ error: "Supermarket not found for item", item_Id });
        }

        // Find the specific item within the supermarket
        const item = supermarket.items.find(
          (item) => item._id.toString() === item_Id.toString()
        );
        if (!item) {
          itemsDetails.push({
            item_name: "Unidentified",
            price: "Unidentified",
            sm_name: supermarket.sm_name,
            quantity: orderItem.quantity,
          });
          continue; // Continue to the next iteration
          // return res
          //   .status(404)
          //   .json({ error: "Item not found in the supermarket" });
        }

        // Push relevant item details along with quantity to itemsDetails array
        itemsDetails.push({
          item_name: item.item_name,
          price: item.price,
          sm_name: supermarket.sm_name,
          quantity: orderItem.quantity,
        });
      }

      // Push order details along with itemsDetails and customer name to ordersDetails array
      ordersDetails.push({
        order_details: {
          order_id: foundOrder._id,
          customer_id: foundOrder.customer_id,
          customer_name: customer.cus_name,
          contact_number: customer.cus_cnumber,
          address: customer.cus_address,
          purchase_amount: foundOrder.purchase_amount,
          order_district: foundOrder.order_district,
          total_amount: foundOrder.total_amount,
          order_status: foundOrder.order_status,
          order_date: foundOrder.order_date,
          additional_notes: foundOrder.additional_notes,
          delivery: foundOrder.delivery,
          cash_payment: foundOrder.cash_payment,
          card_payment: foundOrder.card_payment,
        },
        items: itemsDetails,
      });
    }

    // Push task with order details to tasksWithOrderDetails array
    tasksWithOrderDetails.push({
      task_id: task._id,
      branch_id: task.branch_id,
      driver_id: task.driver_id,
      district: task.district,
      orders: ordersDetails,
    });

    // If the task with order details is found, send it as a response
    res.status(200).json(tasksWithOrderDetails);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//update pickup details of an order
router.put("/update-pickup/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { status, pickupImageUrl } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { "orders.order_id": orderId },
      {
        $set: {
          "orders.$.status": status,
          "orders.$.pickup_image_url": pickupImageUrl,
          "orders.$.pickedup_time": new Date(),
        },
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update order_status in the Order schema
    await Order.findOneAndUpdate(
      { _id: orderId }, // Assuming task has order_id
      { $set: { order_status: status } },
      { new: true }
    );

    res.json({ message: "Order details updated successfully", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//update delivery details of an order
router.put("/update-delivery/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { status, deliveryImageUrl } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { "orders.order_id": orderId },
      {
        $set: {
          "orders.$.status": status,
          "orders.$.delivered_image_url": deliveryImageUrl,
          "orders.$.delivered_time": new Date(),
        },
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update order_status in the Order schema
    await Order.findOneAndUpdate(
      { _id: orderId }, // Assuming task has order_id
      { $set: { order_status: status } },
      { new: true }
    );

    res.json({ message: "Order details updated successfully", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/customer/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // If customer is found, return the details
    res.json(customer);
  } catch (error) {
    console.error("Error retrieving customer details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
