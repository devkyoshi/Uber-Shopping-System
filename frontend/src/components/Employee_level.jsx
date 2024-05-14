import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userslice";

import { Typography } from "@material-tailwind/react";

export default function Employee_level() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/lvlupdate/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  // Function to calculate user level based on Avg_rating
  const calculateLevel = (Avg_rating) => {
    if (Avg_rating === 0) {
      return 0;
    } else if (Avg_rating > 0 && Avg_rating <= 1) {
      return 1;
    } else if (Avg_rating >= 2 && Avg_rating < 3) {
      return 2;
    } else if (Avg_rating >= 4) {
      return 3;
    } else {
      return 0; // Default level
    }
  };

  // Calculate total amount including ETF and EPF deductions
  const totalAmount = ((currentUser.salary * currentUser.Avg_rating) / 100) + currentUser.salary;
  const ETF = currentUser.salary * 0.03; // Assuming ETF deduction is 3% of the salary
  const EPF = currentUser.salary * 0.08; // Assuming EPF deduction is 8% of the salary

  return (
    <div className="flex flex-row gap-8 mx-auto mt-10">
      <div className="flex flex-col gap-4 w-96">
        <div className="p-3 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold text-center text-blue-gray-900">User Level</h3>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-800">{currentUser.username}</p>
            <p className="text-sm text-gray-500">{currentUser.email}</p>
            <div className="border-t border-gray-200 mt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-3">
                  <dt className="text-sm font-medium text-gray-500">User Level</dt>
                  <dd className="mt-1 text-sm text-gray-900">level {calculateLevel(currentUser.Avg_rating)}</dd>
                </div>
                <div className="py-3">
                  <dt className="text-sm font-medium text-gray-500">Your Average Rating = {currentUser.Avg_rating}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    Amount = LKR {totalAmount.toFixed(2)}/=
                  </dd>
                  <dd className="mt-1 text-sm text-gray-900">
                    ETF = LKR {ETF.toFixed(2)}/=
                  </dd>
                  <dd className="mt-1 text-sm text-gray-900">
                    EPF = LKR {EPF.toFixed(2)}/=
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
  
      <div className="flex flex-col gap-4 w-96">
        <div className="p-3 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold text-blue-gray-800">Delivery Information</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">{currentUser.username}</h3>
              <p className="text-sm text-gray-500">Delivery Person</p>
              <div className="border-t border-gray-200 mt-4">
                <dl className="divide-y divide-gray-200">
                 
                  <div className="py-3">
                    <dt className="text-sm font-medium text-gray-500">Vehicle</dt>
                    <dd className="mt-1">
                      <select
                        id="Emp_transport"
                        defaultValue={currentUser.Emp_transport}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="car">Car</option>
                        <option value="van">Van</option>
                        <option value="bike">Bike</option>
                        <option value="three_wheeler">Three Wheeler</option>
                      </select>
                    </dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-sm font-medium text-gray-500">Areas Covered</dt>
                    <dd className="mt-1">
                      <select
                        id="Emp_areofservice"
                        defaultValue={currentUser.Emp_areofservice}
                        onChange={handleChange}
                        className="input-field"
                        name="city"
                      >
                        <option value="Colombo">Colombo</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Kalutara">Kalutara</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Matale">Matale</option>
                        <option value="Galle">Galle</option>
                        <option value="Matara">Matara</option>
                        <option value="Hambantota">Hambantota</option>
                        <option value="Jaffna">Jaffna</option>
                      </select>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <button
              type="submit"
              gradientDuoTone="purpleToPink"
              className="w-40 h-10 mx-auto text-white"
              style={{ background: 'linear-gradient(to right, #8A2BE2, #FF69B4)', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}
            >
              Update
            </button>
            {updateUserSuccess && (
              <div className="mt-5 bg-green-100 rounded-lg p-3  whitespace-normal">{updateUserSuccess}</div>
            )}
            {updateUserError && (
              <div className="mt-5 bg-red-100 rounded-lg p-3">{updateUserError}</div>
            )}
            {error && (
              <div className="mt-5 bg-red-100 rounded-lg p-3">{error}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
