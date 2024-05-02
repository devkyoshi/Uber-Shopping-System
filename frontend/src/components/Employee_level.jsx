import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, TextInput } from 'flowbite-react';
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from '../redux/user/userslice';

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
      setUpdateUserError('No changes made');
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/lvlupdate/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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

  return (
    <div className='max-w-lg  p-3 w-full flex flex-row  gap-17'>
      <div className='gap-2 ml-5 mr-5  w-70 pr-11 pl-11'> 
        <h2 className='my-7 text-center font-semibold text-3xl'>User Level</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{currentUser.username}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{currentUser.email}</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Level</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{currentUser.Emp_Level}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Salary Details</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <ul className="divide-y divide-gray-200">
                    <li className="py-2 flex justify-between items-center">
                      <span className="flex-1">Amount = LKR {currentUser.salary}/= </span>
                    </li>
                    <li className="py-2 flex justify-between items-center">
                      <span className="flex-1">bonus = {currentUser.bonuses}%</span>
                    </li>
                    <li className="py-2 flex justify-between items-center">
                      <span className="flex-1">bonus = {currentUser.benefits}</span>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className='gap-2 ml-5 mr-5'>
        <h2 className='my-7 text-center font-semibold text-3xl'>Delivery Information</h2>
        <form onSubmit={handleSubmit} className='flex flex-col mb-7 gap-4'>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{currentUser.username}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Delivery Person</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 ml-0 mr-8">Experience</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 ml-10">3 years</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Number of Deliveries</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 ml-10">500+</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Vehicle</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 ">
                    <TextInput
                      type="text"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      placeholder="Enter your vehicle"
                      id='Emp_transport'
                      defaultValue={currentUser.Emp_transport}
                      onChange={handleChange}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Areas Covered</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    <TextInput
                      type="text"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      placeholder="Enter cities (separated by commas)"
                      id='Emp_areofservice'
                      onChange={handleChange}
                      defaultValue={currentUser.Emp_areofservice}
                      name="city"
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            Update
          </Button>
        </form>
      </div>

      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
    </div>
  );
};
