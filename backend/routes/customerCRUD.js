//IT22103840 Y.L.Jayasinghe customerCRUD

const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

// Create a new customer
router.post("/customer-add", async (req, res) => {
    try {
        const { cus_name, cus_age, cus_email, cus_gender, cus_cnumber, cus_username, cus_password, cus_address, cus_lattidude, cus_longtitude } = req.body;
        const newCustomer = new Customer({
            cus_name,
            cus_age,
            cus_email,
            cus_gender,
            cus_cnumber,
            cus_username,
            cus_password,
            cus_address,
            cus_lattidude,
            cus_longtitude
        });
        await newCustomer.save();
        res.json("Customer Added");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding the customer" });
    }
});

// Update a customer
router.put("/customer-update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await Customer.findByIdAndUpdate(id, updateData);
        res.json({ status: "Customer updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the customer" });
    }
});

// Add card details to an existing customer
router.post("/customer-add-card/:customerId", async (req, res) => {
    try {
        const { customerId } = req.params;
        const { account_number, account_holder, cvc } = req.body;

        // Find the customer by ID
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // Add card details to the customer document
        customer.card = {
            account_number,
            account_holder,
            cvc
        };

        // Save the updated customer document
        await customer.save();
        res.json("Card details added to customer");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding card details" });
    }
});


// Update a customer card details
router.put("/customer-update-card/:customerId", async (req, res) => {
    try {
        const { customerId } = req.params;
        const { account_number, account_holder, cvc } = req.body;

        // Find the customer by ID
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // Update card details in the customer document
        customer.card = {
            account_number,
            account_holder,
            cvc
        };

        // Save the updated customer document
        await customer.save();
        res.json("Card details updated for customer");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating card details" });
    }
});

// Delete a customer
router.delete("/customer-delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Customer.findByIdAndDelete(id);
        res.json({ status: "Customer deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the customer" });
    }
});

// Read all customers
router.get("/customer-all", async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching customers" });
    }
});


module.exports = router;