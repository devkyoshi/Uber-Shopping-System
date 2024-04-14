import React, { useEffect, useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [OrdersByDistrict, setOrdersByDistrict] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8070/Order/orders");
        if (response && response.data && Array.isArray(response.data)) {
          console.log("Response received:", response);

          const orders = response.data.filter(order => order.order_status === "pending");
          console.log("Filtered orders:", orders);

          // Group orders by district
          const ordersByDistrict = {};
          orders.forEach(order => {
            if (!order.order_district) {
              console.error("District information missing for order:", order);
              return;
            }
            if (!ordersByDistrict[order.order_district]) {
              ordersByDistrict[order.order_district] = [];
            }
            ordersByDistrict[order.order_district].push(order);
          });
          console.log("Orders grouped by district:", ordersByDistrict);
          
          setOrdersByDistrict(ordersByDistrict);
          // Set pending orders state
          setPendingOrders(orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchPendingOrders(); // Call the fetch function
  }, []); // Empty dependency array to run once on component mount

  const sendDataToBackend = async () => {
    try {
      const firstFiveOrders = pendingOrders.slice(0, 5);

      const response = await axios.get("http://localhost:8070/Driver/drivers");
      console.log('response:', response.data);
      const drivers = response.data.filter(driver => driver.availability === "Available");
      console.log('filter:', drivers); 
      
      if (drivers.length === 0) {
        setMessage("No available driver found");
        return;
      }

      // group drivers according to the district
      const driversByDistrict = {};
      drivers.forEach(driver => {
        if (!driver.available_district) {
          console.error("District information missing for Driver:", driver);
          return;
        }
        if (!driversByDistrict[driver.available_district]) {
          driversByDistrict[driver.available_district] = [];
        }
        driversByDistrict[driver.available_district].push(driver);
      });
      console.log("Drivers grouped by district:", driversByDistrict);

      console.log('order Constant:', OrdersByDistrict); 

      // Check for available drivers matching order districts
      const matchingDistricts = Object.keys(OrdersByDistrict).filter(district =>
        Object.keys(driversByDistrict).includes(district) &&
        driversByDistrict[district].length > 0
      );
      console.log('matching districts:', matchingDistricts);

      if (matchingDistricts.length === 0) {
        setMessage("No available driver found for the order districts");
        return;
      }

      // Get driver IDs for matching districts
      const matchingDriverIds = matchingDistricts.reduce((acc, available_district) => {
        const driversForDistrict = driversByDistrict[available_district];
        const driverIdsForDistrict = driversForDistrict.map(driver => driver._id);
        return [...acc, ...driverIdsForDistrict];
      }, []);

      console.log('Matching driver IDs:', matchingDriverIds);

      const randomDistrict = matchingDistricts[Math.floor(Math.random() * matchingDistricts.length)];
      const randomDriversInDistrict = driversByDistrict[randomDistrict];
      const randomDriver = randomDriversInDistrict[Math.floor(Math.random() * randomDriversInDistrict.length)];

      console.log('randomDriver', randomDriver);

      if (!randomDriver) {
        setMessage("No available driver found for the selected district");
        return;
      }

      const taskData = {
        driver_id: randomDriver.driver_id,
        branch_id: randomDriver.branch_ID,
        district: randomDistrict,
        orderIds: firstFiveOrders.map(order => order._id)
      };
      
      console.log('Task Data:', taskData);
      console.log('Task Data123:', taskData.driver_id, taskData.branch_id, taskData.district, taskData.orderIds);
    
      await axios.post("http://localhost:8070/Task/add-task", taskData);
     
      setPendingOrders(updatedOrders);
      setMessage("Task added successfully");
    } catch (error) {
      console.error("Error sending data to backend:", error);
      setMessage("Error occurred while adding task");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (pendingOrders.length > 4) {
        sendDataToBackend();
      }
    }, 30*60*1000); // Check every 30 minutes if there are at least 5 pending orders

    return () => clearInterval(interval);
  }, [pendingOrders]);

  return (
    <div>
      <h2>Add Task</h2>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTask;
