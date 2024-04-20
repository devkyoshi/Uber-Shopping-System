import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryComponent = () => {
  const [orderId, setOrderId] = useState('');
  const [deliveryId, setDeliveryId] = useState('');
  const [distance, setDistance] = useState('');
  const [costPerkm, setCostPerkm] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [error, setError] = useState('');

  // Fetch existing delivery details for an order
  const fetchDeliveries = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/Order/orders/${orderId}/read_delivery`);
      setDeliveries(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add delivery details to an order
  const addDelivery = async () => {
    try {
      const response = await axios.post(`http://localhost:8070/Order/add-delivery/${orderId}`, {
        distance,
        costPerkm
      });
      alert(response.data);
      fetchDeliveries();  // Refresh delivery details after adding
    } catch (err) {
      setError(err.message);
    }
  };

  // Update delivery details in an order
  const updateDelivery = async () => {
    try {
      const response = await axios.put(`http://localhost:8070/Order/${orderId}/update-delivery/${deliveryId}`, {
        distance,
        costPerkm
      });
      alert(response.data);
      fetchDeliveries();  // Refresh delivery details after updating
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchDeliveries();  // Fetch delivery details when orderId changes
    }
  }, [orderId]);

  return (
    <div>
      <h2>Manage Delivery Details</h2>

      <div>
        <label>
          Order ID:
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Delivery ID:
          <input
            type="text"
            value={deliveryId}
            onChange={(e) => setDeliveryId(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Distance (in km):
          <input
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Cost Per km:
          <input
            type="text"
            value={costPerkm}
            onChange={(e) => setCostPerkm(e.target.value)}
          />
        </label>
      </div>

      <button onClick={addDelivery}>Add Delivery Details</button>
      <button onClick={updateDelivery}>Update Delivery Details</button>

      <div>
        <h3>Existing Deliveries:</h3>
        <ul>
          {deliveries.map((delivery, index) => (
            <li key={index}>
              ID: {delivery._id}, Distance: {delivery.distance}, Cost Per km: {delivery.costPerkm}, Charges: {delivery.charges}
            </li>
          ))}
        </ul>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default DeliveryComponent;
