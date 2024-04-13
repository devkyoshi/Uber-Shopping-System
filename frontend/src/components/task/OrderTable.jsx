import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8070/Order/orders');
        console.log('API Response:', response.data); // Log the response data

        const filteredOrders = response.data.filter(order => order.order_status === 'pending');
        
        // Sort orders by district and then by order_id
        const sortedOrders = filteredOrders.sort((a, b) => {
          const districtA = a.cash_payment ? a.cash_payment.district : (a.card_payment ? a.card_payment.district : '');
          const districtB = b.cash_payment ? b.cash_payment.district : (b.card_payment ? b.card_payment.district : '');

          if (districtA === districtB) {
            return String(a._id).localeCompare(String(b._id));
          } 
          return districtA.localeCompare(districtB);
        });

        setOrders(sortedOrders);
        setLoading(false); // Set loading to false after fetching and setting orders
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>District</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={String(order._id)}>
              <td>{order._id}</td>
              <td>
                {order.cash_payment ? order.cash_payment.district : (order.card_payment ? order.card_payment.district : '')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
