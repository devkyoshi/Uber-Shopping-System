const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Order = require("../models/order");
 const Branch = require("../models/branch")
const mongoose = require("mongoose");
import axios from "axios";

const AddTask = () => {
  const [OrdersByDistrict, setOrdersByDistrict] = useState([]);
  const [districtOrderCount, setDistrictOrderCount] = useState([]);
  const [driversByDistrict, setDriversByDistrict] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get("http://localhost:8070/Order/orders");
        if (response && response.data && Array.isArray(response.data)) {
          console.log("Response received:", response);

          const payedOrders = response.data.filter(order => {
            return (
              (order.cash_payment?.payment_method === "cash" || order.card_payment?.payment_method === "card")
            );
          });
          console.log('payed orders', payedOrders)
          
          const orders = payedOrders.filter(order => order.order_status === "pending");
          console.log("Filtered orders:", orders);

          // Group orders by district
          const ordersByDistrict = {};
          const districtOrderCount ={};
          orders.forEach(order => {
            if (!order.order_district) {
              console.error("District information missing for order:", order);
              return;
            }
            if (!ordersByDistrict[order.order_district]) {
              ordersByDistrict[order.order_district] = [];
              districtOrderCount[order.order_district] = 0;
            }
            ordersByDistrict[order.order_district].push(order);
            districtOrderCount[order.order_district]++;
          });
          console.log("Orders grouped by district:", ordersByDistrict);
          console.log("Order count by district:", districtOrderCount);
          
          setOrdersByDistrict(ordersByDistrict);
          setDistrictOrderCount(districtOrderCount);
          // Set pending orders state
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrder(); // Call the fetch function
  }, [message]); // Empty dependency array to run once on component mount

  
  useEffect(() => {
    const fetchDriver =async() => {
      try {

        // get available drivers from  all branches
        const response = await axios.get("http://localhost:8070/Driver/drivers");
        console.log('response:', response.data);
        const drivers = response.data.filter(driver => driver.availability === "Available");
        console.log('filter:', drivers); 
        
        if (drivers.length === 0) {
          setError("No available driver found");
          return;
        }

        //  available drivers are allocate as the district level
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
        console.log("Drivers allocate as the district:", driversByDistrict);
        setDriversByDistrict(driversByDistrict);

      } catch (error) {

        console.error("Error fetching drivers:", error); // Log the error
        setError("Error fetching drivers. Please try again."); // Set error state
        
      }
    };
    fetchDriver();
  }, [message]);

  const fiveOrders = async () => {
    try {
        const matchingDistricts = Object.keys(OrdersByDistrict).filter(district =>
            Object.keys(driversByDistrict).includes(district) &&
            driversByDistrict[district].length > 0
        );

        if (matchingDistricts.length === 0) {
            setError("No available driver found for any order district");
            return;
        }

        for (const district of matchingDistricts) {
            const ordersInDistrict = OrdersByDistrict[district];
            if (ordersInDistrict.length < 5) continue; // Skip districts with fewer than 5 orders

            const randomDriver = getRandomDriverInDistrict(district);
            if (!randomDriver) {
                setError(`No available driver found for ${district}`);
                continue;
            }

            const firstFiveOrders = ordersInDistrict.slice(0, 5);
            const taskData = {
                driver_id: randomDriver.driver_id,
                branch_id: randomDriver.branch_ID,
                district: district,
                orderIds: firstFiveOrders.map(order => order._id)
            };

            await axios.post("http://localhost:8070/Task/add-task", taskData);
        }

        setMessage("Tasks added successfully");
    } catch (error) {
        console.error("Error sending data to backend:", error);
        setError("Error occurred while adding tasks");
    }
  };

  const getRandomDriverInDistrict = (district) => {
    const driversInDistrict = driversByDistrict[district];
    return driversInDistrict.length > 0 ? driversInDistrict[Math.floor(Math.random() * driversInDistrict.length)] : null;
  };


  const fewerfiveOrders = async () => {
    try {
        const matchingDistricts = Object.keys(OrdersByDistrict).filter(district =>
            Object.keys(driversByDistrict).includes(district) &&
            driversByDistrict[district].length > 0
        );

        console.log('matchingDistricts', matchingDistricts)
        if (matchingDistricts.length === 0) {
            setError("No available driver found for any order district");
            return;
        }

        for (const district of matchingDistricts) {
            const ordersInDistrict = OrdersByDistrict[district];
            if (ordersInDistrict.length < 5) continue; // Skip districts with fewer than 5 orders

            const randomDriver = getRandomDriverInDistricts(district);
            if (!randomDriver) {
                setError(`No available driver found for ${district}`);
                continue;
            }

            const firstFiveOrders = ordersInDistrict.slice(0, 5);
            const taskData = {
                driver_id: randomDriver.driver_id,
                branch_id: randomDriver.branch_ID,
                district: district,
                orderIds: firstFiveOrders.map(order => order._id)
            };

            await axios.post("http://localhost:8070/Task/add-task", taskData);
        }

        setMessage("Tasks added successfully");
    } catch (error) {
        console.error("Error sending data to backend:", error);
        setError("Error occurred while adding tasks");
    }
  };

  const getRandomDriverInDistricts = (district) => {
      const driversInDistrict = driversByDistrict[district];
      return driversInDistrict.length > 0 ? driversInDistrict[Math.floor(Math.random() * driversInDistrict.length)] : null;
  };



  useEffect(() => {
    if(Object.values(districtOrderCount).some(count => count >= 5)){
      console.log("Enough orders found. Triggering task assignment.");
      fiveOrders();
      return;
    };

    const interval = setInterval(() => {
      const hasEnoughOrders = Object.values(districtOrderCount).some(count => count < 5);
      console.log("Order Counts according to district:", districtOrderCount);
      console.log("Checking for enough orders in any district:", hasEnoughOrders);
      if (hasEnoughOrders) {
        console.log("Not enough orders found. Triggering fewer five Orders.");
        fewerfiveOrders();
      } 
    }, 60* 30 * 1000);
    return () => clearInterval(interval);
  }, [districtOrderCount]);

  return (
    <div>
      <h2>Add Task</h2>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTask;
