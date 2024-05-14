import React from "react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { Alert, Modal, ModalBody, TextInput, Label } from "flowbite-react";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userslice";

import { Typography, Button } from "@material-tailwind/react";

import { useDispatch } from "react-redux";

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value.trim();
    
    
    if (id === 'Emp_Age') {
      const age = parseInt(newValue);
      if (isNaN(age) || age < 18 || age > 60) {
        setUpdateUserError("Please enter a valid age between 18 and 60.");
        return;
      } else {
        setUpdateUserError(null);
      }
    }
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
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
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
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  function handleKeyPress(event) {
    const keyPressed = event.key;
    const isLetter = /^[a-zA-Z\s]$/.test(keyPressed);
    const isBackspace = keyPressed === "Backspace";
    const isDelete = keyPressed === "Delete";

    if (!isLetter && !isBackspace && !isDelete) {
      event.preventDefault();
    }
  }
  return (
    <div className="inner-layout m-5">
      <Typography
        variant="h1"
        className="mt-2 text-center font-semibold text-3xl mb-5"
      >
        Profile
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col mb-2 gap-4 ">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={
              "https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png"
            }
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

        <div className="flex flex-row gap-2 ml-5 mr-5">
          <div className="flex flex-col flex-1 gap-2">
            <Label value="Username" />
            <TextInput
              type="text"
              id="username"
              placeholder="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />

            <Label value="Email" />
            <TextInput
              type="email"
              id="email"
              placeholder="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <Label value="Password" />
            <TextInput
              type="password"
              id="password"
              placeholder="**********"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <Label value="Name" />
            <TextInput
              type="text"
              id="Emp_Name"
              placeholder="Employee Name"
              defaultValue={currentUser.Emp_Name}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
            <Label value="Age" />
            <TextInput
              type="number"
              id="Emp_Age"
              placeholder="Employee Age"
              defaultValue={currentUser.Emp_Age}
              onChange={handleChange}
            />
           <Label value='Gender' />
<select
  id='Emp_Gender'
  defaultValue={currentUser.Emp_Gender}
  onChange={handleChange}
  style={{ height: '40px', padding: '10px', width: '100%' }}
>
  <option value='Male'>Male</option>
  <option value='Female'>Female</option>
  <option value='Other'>Other</option>
</select>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <Label value="Tel. Number" />
            <TextInput
              type="number"
              id="Emp_CNumber"
              placeholder="Employee Contact Number"
              defaultValue={currentUser.Emp_CNumber}
              onChange={handleChange}
            />
            <Label value="Adress" />
            <TextInput
              type="text"
              id="Emp_Address"
              placeholder="Employee Address"
              defaultValue={currentUser.Emp_Address}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="w-40 h-10 mx-auto mt-5"
          style={{ backgroundColor: "#00008B" }}
        >
          Update
        </Button>

       
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
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
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
