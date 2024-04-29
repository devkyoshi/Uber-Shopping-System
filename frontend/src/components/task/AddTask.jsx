import React, { useEffect, useState } from "react";
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

          const orders = response.data.filter(order => order.order_status === "pending");
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
        //get the first five orders from order array
      const districtWithFiveOrders = Object.keys(OrdersByDistrict).find(district => OrdersByDistrict[district].length >= 5);
      const firstFiveOrders = OrdersByDistrict[districtWithFiveOrders].slice(0, 5);
      
        // Check for available drivers matching order districts
        const matchingDistricts = Object.keys(OrdersByDistrict).filter(district =>
          Object.keys(driversByDistrict).includes(district) &&
          driversByDistrict[district].length > 0
        );
        console.log('matching districts:', matchingDistricts);
  
        if (matchingDistricts.length === 0) {
          setError("No available driver found for the order districts");
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
          setError("No available driver found for the selected district");
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
        
        setMessage("Task added successfully");
        
      console.log('firstFiveOrder', firstFiveOrders);
      } catch (error) {
          console.error("Error sending data to backend:", error);
          setError("Error occurred while adding task");
      }
    };

    const fewerfiveOrders = async () => {
      try {

          //get the first five orders from order array
        const districtWithFiveOrders = Object.keys(OrdersByDistrict).find(district => OrdersByDistrict[district].length < 5);
        const firstFiveOrders = OrdersByDistrict[districtWithFiveOrders];
        
        // Check for available drivers matching order districts
      const matchingDistricts = Object.keys(OrdersByDistrict).filter(district =>
        Object.keys(driversByDistrict).includes(district) &&
        driversByDistrict[district].length > 0
      );
      console.log('matching districts:', matchingDistricts);

      if (matchingDistricts.length === 0) {
        setError("No available driver found for the order districts");
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
        setError("No available driver found for the selected district");
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
     
      setMessage("Task added successfully");
  
        console.log('fewer five Order', firstFiveOrders);
        } catch (error) {
            console.error("Error sending data to backend:", error);
            setError("Error occurred while adding task");
        }
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
