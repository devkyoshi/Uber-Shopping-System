import React, { useState } from "react";
import axios from "axios";

const ComplaintReplacement = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    customer_id: "",
    purchase_amount: "",
    order_district: "",
    total_amount: "",
    additional_notes: "",
    delivery: {
      charges: "",
      distance: "",
    },
    cash_payment: {
      email: "",
      payment_amount: "",
      address: "",
      postal_code: "",
      district: "",
      nearest_town: "",
    },
    card_payment: {
      email: "",
      account_number: "",
      exp: "",
      cvc: "",
      account_holder: "",
    },
  });

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8070/orders",
        formData
      );
      console.log("Order created:", response.data);
      // Reset the form after successful submission
      setFormData({
        customer_id: "",
        purchase_amount: "",
        order_district: "",
        total_amount: "",
        additional_notes: "",
        delivery: {
          charges: "",
          distance: "",
        },
        cash_payment: {
          email: "",
          payment_amount: "",
          address: "",
          postal_code: "",
          district: "",
          nearest_town: "",
        },
        card_payment: {
          email: "",
          account_number: "",
          exp: "",
          cvc: "",
          account_holder: "",
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit}>
        {/* Customer Details */}
        <label>
          Customer ID:
          <input
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
          />
        </label>
        {/* Order Details */}
        <label>
          Purchase Amount:
          <input
            type="text"
            name="purchase_amount"
            value={formData.purchase_amount}
            onChange={handleChange}
          />
        </label>
        {/* Other Order Details */}
        {/* ... Add other fields similar to above */}

        {/* Cash Payment Details */}
        <h3>Cash Payment</h3>
        <label>
          Email:
          <input
            type="email"
            name="cash_payment.email"
            value={formData.cash_payment.email}
            onChange={handleChange}
          />
        </label>
        {/* Add other fields for cash payment */}

        {/* Card Payment Details */}
        <h3>Card Payment</h3>
        <label>
          Email:
          <input
            type="email"
            name="card_payment.email"
            value={formData.card_payment.email}
            onChange={handleChange}
          />
        </label>
        {/* Add other fields for card payment */}

        {/* Submit Button */}
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default ComplaintReplacement;
