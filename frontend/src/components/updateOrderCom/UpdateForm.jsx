import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


  export function UpdateForm() {

    const [formData, setFormData] = useState({
        customer_id: "",
        purchase_amount: "",
        total_amount: "",
        order_status: "",
        additional_notes: "",
        delivery: {
          charges: "",
          distance: ""
        }
      });

      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8070/Order/order-add", formData); //api thingy (address)
          console.log(response.data); // You can handle the response as needed
        } catch (error) {
          console.error("Error:", error);
        }
      };

    // design starts from here
    return (
       <Card color="transparent" shadow={false}>
         <div style={{ display: 'flex', justifyContent: 'center' }}>
         <Typography variant="h4" color="blue-gray ">
          Make Changes
        </Typography>
         </div>
        
        <div className="flex items-center justify-center h-full">
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 center" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-5">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Customer ID
            </Typography>
            <Input
              size="lg"
              value={formData.customer_id}
              onChange={handleChange}
              name="customer_id"
              placeholder="Enter Your Customer ID"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Total Amount
            </Typography>
            <Input
              type="text"
              size="lg"
              value={formData.total_amount}
              onChange={handleChange}
              name="total_amount"
              placeholder="Enter Total Amount"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Order Status
            </Typography>
            {/**check box 1 */}
            <div class="inline-flex items-center">
              <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                  <input type="checkbox"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id="check" />
                  <span
                    class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                      stroke="currentColor" stroke-width="1">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </span>
              </label>
                <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="check">
                  Ongoing
                </label>

                {/**Check box 2 */}
                <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                  <input type="checkbox"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id="check" />
                  <span
                    class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                      stroke="currentColor" stroke-width="1">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </span>
              </label>
              <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="check">
                  Delivered
                </label>

                {/**check box 3 */}
                <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                  <input type="checkbox"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id="check" />
                  <span
                    class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                      stroke="currentColor" stroke-width="1">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </span>
              </label>
              <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="check">
                  Picked
                </label>
                
            </div> 

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Additional Notes
            </Typography>
            <Input
              type="text"
              size="lg"
              value={formData.additional_notes}
              onChange={handleChange}
              name="additional_notes"
              placeholder="Enter Total Amount"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Delivery Charges
            </Typography>
            <Input
              type="text"
              size="lg"
              value={formData.charges}
              onChange={handleChange}
              name="charges"
              placeholder="Enter Charges"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Distance
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter Distance"
              value={formData.distance}
              onChange={handleChange}
              name="distance"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          
          <Button type="submit" className="mt-6" fullWidth>
            Confirm Changes
          </Button>

          <Button onClick={()=>{navigate("/myOrder",{replace: true})}} className="bg-gray-300 text-black hover:bg-gray-500 mt-3" fullWidth>
            Cancel
          </Button>
         
        </form>
        </div>
      </Card>
    );
  }