import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, Label, Modal, Select, TextInput } from "flowbite-react";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../../../redux/customer/customerRegisterSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ProfileDetail() {
  const { currentCustomer, error, loading } = useSelector(
    (state) => state.customer
  );
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserFailure, setUpdateUserFailure] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value.trim();
    if (id === 'cus_age') {
      const age = parseInt(newValue);
      if (isNaN(age) || age < 18 || age > 60) {
        setUpdateUserFailure("Please enter a valid age between 18 and 60.");
        return;
      } else {
        setUpdateUserFailure(null);
      }
    }
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserFailure(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    if (
      formData.cus_email === "" ||
      formData.cus_age === "" ||
      formData.cus_name === "" ||
      formData.cus_gender === "" ||
      formData.cus_cnumber === "" ||
      formData.cus_address === "" ||
      formData.cus_username === ""
    ) {
      dispatch(updateFailure());
      setUpdateUserFailure("Can't keep fields empty.");
      return;
    }
    if(formData.cus_age<18){
      dispatch(updateFailure());
      setUpdateUserFailure("You should be atleast 18 years old.");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/customer/update/${currentCustomer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure());
        setUpdateUserFailure(data.message);
        return;
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Your profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserFailure(error.message);
    }
  };

  function handleKeyPress(event) {
    const keyPressed = event.key;
    const isLetter = /^[a-zA-Z\s]$/.test(keyPressed);
    const isBackspace = keyPressed === 'Backspace';
    const isDelete = keyPressed === 'Delete';

    if (!isLetter && !isBackspace && !isDelete) {
        event.preventDefault();
    }
  }

  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/customer/delete/${currentCustomer._id}`, {
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

  const handleSignOut = async () => {
    try {
      const res = await fetch("/customer/signout", {
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
  useEffect(() => {
    let errorMessageTimer;
    let updateSuccessTimer;

    if (updateUserFailure) {
      errorMessageTimer = setTimeout(() => {
        setUpdateUserFailure(null);
      }, 3000);
    }

    if (updateUserSuccess) {
      updateSuccessTimer = setTimeout(() => {
        setUpdateUserSuccess(null);
      }, 3000);
    }

    return () => {
      clearTimeout(errorMessageTimer);
      clearTimeout(updateSuccessTimer);
    };
  }, [updateUserSuccess, updateUserFailure]);
  return (
    <div className="mx-auto w-full">
      <style>
        {`
          #Cus_CNumber::-webkit-inner-spin-button,
          #Cus_CNumber::-webkit-outer-spin-button {-webkit-appearance: none;margin: 0;}
        `}
      </style>
      <h1 className="mb-5 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex  flex-col gap-2">
        <div className="mb-2 w-24 h-24 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <div className="flex flex-row gap-10"><div className="flex flex-col flex-1 gap-2">
        <Label value="Username" />
        <TextInput
          onChange={handleChange}
          type="text"
          id="cus_username"
          placeholder="Username"
          defaultValue={currentCustomer.cus_username}
        ></TextInput>
        <Label value="E-mail" />
        <TextInput
          onChange={handleChange}
          type="email"
          id="cus_email"
          placeholder="E-mail"
          defaultValue={currentCustomer.cus_email}
        ></TextInput>
        <Label value="Password" />
        <TextInput
          onChange={handleChange}
          type="password"
          id="cus_Password"
          placeholder="Password"
        ></TextInput></div><div className="flex flex-col flex-1 gap-2">
        <Label value="Full name" />
        <TextInput
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          type="text"
          id="cus_name"
          placeholder="Full name"
          defaultValue={currentCustomer.cus_name}
        ></TextInput>
          <Label value="Contact number" />
            <TextInput
              onChange={handleChange}
              type="number"
              id="cus_cnumber"
              placeholder="Contact number"
              defaultValue={currentCustomer.cus_cnumber}
            ></TextInput>
        <div className="flex flex-row gap-2">
          {/* <div className="flex flex-col flex-1">
            <Label value="Contact number" />
            <TextInput
              onChange={handleChange}
              type="number"
              id="cus_cnumber"
              placeholder="Contact number"
              defaultValue={currentCustomer.cus_cnumber}
            ></TextInput>
          </div> */}
          <div className="flex flex-col flex-1 gap-2">
            <Label value="Gender" />
            <Select
              defaultValue={currentCustomer.cus_gender}
              onChange={handleChange}
              id="cus_gender"
            >
              <option
                value=""
                defaultValue={currentCustomer.cus_gender}
              ></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          {/* <div className="flex flex-col flex-1 gap-2">
            <Label value="Age" />
            <TextInput
              onChange={handleChange}
              type="number"
              id="cus_age"
              placeholder="Age"
              defaultValue={currentCustomer.cus_age}
            ></TextInput>
          </div> */}
        </div></div><div className="flex flex-col flex-1 gap-2">
        
        <Label value="Age" />
        <TextInput
          onChange={handleChange}
          type="number"
          id="cus_age"
          placeholder="Age"
          defaultValue={currentCustomer.cus_age}
        ></TextInput>
        
        <Label value="Address" />
        <textarea
          onChange={handleChange}
          className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500 resize-none"
          id="cus_address"
          placeholder="Address"
          defaultValue={currentCustomer.cus_address}
        ></textarea>
        {/* <div className="flex  flex-row gap-2">
          <div className="flex flex-col flex-1 gap-2">
            <Label value="Latitude" />
            <TextInput
              className="flex flex-1"
              type="number"
              placeholder="Latitude"
              id="cus_latitude"
              defaultValue={currentCustomer.cus_latitude}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <Label value="Longtitude" />
            <TextInput
              className="flex flex-1"
              type="number"
              placeholder="Longtitude"
              id="cus_longtitude"
              defaultValue={currentCustomer.cus_longtitude}
            />
          </div>
        </div>*/}</div></div>
        {/* <Button type='submit' gradientDuoTone='pinkToOrange' outline disabled={loading}>{loading ? 'Loading...' : 'Save changes'}</Button> */}

        <button
          className="mt-10 mx-auto"
          type="submit"
          disabled={loading}
          style={{
            width: "21.5rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "0.375rem",
            color: "linear-gradient(90deg, #EC4899, #FFB037)",
            background: "transparent",
            border: "1px solid #EC4899",
            outline: "none",
            opacity: loading ? "0.7" : "1",
            pointerEvents: loading ? "none" : "auto",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.background =
              "linear-gradient(90deg, #EC4899, #FFB037)";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "black";
          }}
        >
          {loading ? "Loading..." : "Save changes"}
        </button>
      </form>
      <div className="text-red-500 flex justify-between mt-10">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete my account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5 bg-green-100">
          {" "}
          {updateUserSuccess}{" "}
        </Alert>
      )}
      {updateUserFailure && (
        <Alert color="failure" className="mt-5">
          {" "}
          {updateUserFailure}{" "}
        </Alert>
      )}

      {error && (
        <Alert color="failure" className="mt-5">
          {" "}
          {error}{" "}
        </Alert>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 ">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
