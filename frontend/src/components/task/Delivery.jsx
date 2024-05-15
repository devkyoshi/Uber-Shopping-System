import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Button, Input } from "@material-tailwind/react";

export function Delivery() {
  const [delivers, setDelivers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    chargePrice: "",
    deliveryFree: "",
    interest: "",
  });

  useEffect(() => {
    fetchDelivers();
  }, [refresh]);

  const fetchDelivers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8070/Delivery/deliveries"
      );
      setDelivers(response.data);
    } catch (error) {
      console.error("Error fetching delivers:", error);
      setErrorMessage("Error fetching delivers");
    }
  };

  const handleUpdate = async (updateddeliver) => {
    // Check if any field is null
    if (
      updateddeliver.chargePrice === null ||
      updateddeliver.deliveryFree === null ||
      updateddeliver.interest === null
    ) {
      window.alert("One or more fields are null. Please fill them out.");
      return; // Do nothing if any field is null
    }

    try {
      await axios.put(
        `http://localhost:8070/Delivery/delivery-update/${updateddeliver._id}`,
        updateddeliver
      );
      window.alert("Delivery updated successfully");
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error updating delivery:", error);
      setErrorMessage("Error updating delivery");
    }
  };

  const handleInputChange = (e, deliverId, fieldName) => {
    const { value } = e.target;
    const updatedDelivers = delivers.map((deliver) => {
      if (deliver._id === deliverId) {
        return {
          ...deliver,
          [fieldName]: value === "" ? null : value,
        };
      }
      return deliver;
    });
    setDelivers(updatedDelivers);
  };

  const resetToOriginalValues = (deliverId) => {
    const updatedDelivers = delivers.map((deliver) => {
      if (deliver._id === deliverId && deliver.originalValues) {
        return {
          ...deliver,
          ...deliver.originalValues,
        };
      }
      return deliver;
    });
    setDelivers(updatedDelivers);
  };

  const toggleEditMode = (deliverId) => {
    setDelivers((prevDelivers) =>
      prevDelivers.map((deliver) => {
        if (deliver._id === deliverId) {
          return {
            ...deliver,
            editMode: !deliver.editMode,
          };
        }
        return deliver;
      })
    );
  };

  const renderSaveOrEditButton = (deliverId) => {
    const deliver = delivers.find((deliver) => deliver._id === deliverId);
    if (deliver.editMode) {
      return (
        <Button
          color="green"
          onClick={() => {
            handleUpdate(deliver);
            toggleEditMode(deliverId);
          }}
        >
          Save
        </Button>
      );
    } else {
      return (
        <Button color="blue" onClick={() => toggleEditMode(deliverId)}>
          Update
        </Button>
      );
    }
  };

  const handleAddDelivery = async () => {
    // Check if any of the fields are null
    try {
      await axios.post("http://localhost:8070/Delivery/delivery-add", formData);
      setShowAddForm(false);
      setFormData({
        chargePrice: "",
        deliveryFree: "",
        interest: "",
      });
    } catch (error) {
      console.error("Error adding delivery:", error);
      window.alert("Please Fill the Fields");
    }
  };

  const handleNumericInputChange = (e, id, field) => {
    const value = e.target.value;
    // Check if the value is numeric
    if (!/[^1-9]/g.test(value)) {
      // If numeric, update the state
      handleInputChange(e, id, field);
    }
  };

  return (
    <Card className="h-full w-full">
      {delivers.length > 0 && (
        <table className="w-full min-w-min table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  style={{ fontWeight: "bolder" }}
                  className="font-normal leading-none opacity-70 text-center"
                >
                  Normal Delivery Charge
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  style={{ fontWeight: "bolder" }}
                  className="font-normal leading-none opacity-70 text-center"
                >
                  Delivery Free Threshold
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  style={{ fontWeight: "bolder" }}
                  className="font-normal leading-none opacity-70 text-center"
                >
                  Percentage
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  style={{ fontWeight: "bolder" }}
                  className="font-normal leading-none opacity-70 text-center"
                >
                  Maximum Order Count
                </Typography>
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50   pt-4 pb-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  style={{ fontWeight: "bolder" }}
                  className="font-normal leading-none opacity-70 text-center"
                >
                  Update
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {delivers.map((deliver) => (
              <tr key={deliver._id} className="mb-4">
                <td className="pl-12">
                  <Input
                    type="text"
                    value={deliver.chargePrice}
                    onChange={(e) =>
                      handleNumericInputChange(e, deliver._id, "chargePrice")
                    }
                    disabled={!deliver.editMode}
                    required
                  />
                </td>
                <td className="pl-6">
                  <Input
                    type="text"
                    value={deliver.deliveryFree}
                    onChange={(e) =>
                      handleNumericInputChange(e, deliver._id, "deliveryFree")
                    }
                    disabled={!deliver.editMode}
                    required
                  />
                </td>
                <td className="pl-6">
                  <Input
                    type="text"
                    value={deliver.interest}
                    onChange={(e) =>
                      handleNumericInputChange(e, deliver._id, "interest")
                    }
                    disabled={!deliver.editMode}
                    required
                  />
                </td>
                <td className="pl-6">
                  <Input
                    type="text"
                    value={deliver.order_count}
                    onChange={(e) =>
                      handleNumericInputChange(e, deliver._id, "order_count")
                    }
                    disabled={!deliver.editMode}
                    required
                  />
                </td>

                <td className="pl-10 pb-4 pt-4">
                  {renderSaveOrEditButton(deliver._id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {delivers.length === 0 && !showAddForm && (
        <div>
          <div className="grid grid-cols-2 gap-8 ">
            <div className="flex flex-col gap-2">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Normal Delivery Charge
              </Typography>
              <Input
                size="lg"
                value={formData.chargePrice}
                onChange={(e) => {
                  const { value } = e.target;
                  const filteredValue = value.replace(/[^1-9]/g, "");
                  setFormData({
                    ...formData,
                    chargePrice: filteredValue,
                  });
                }}
                name="chargePrice"
                placeholder="Enter Charge Price "
                className="mb-4"
              />
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Percentage
              </Typography>
              <Input
                type="text"
                size="lg"
                value={formData.interest}
                onChange={(e) => {
                  const { value } = e.target;
                  const filteredValue = value.replace(/[^1-9]/g, "");
                  setFormData({
                    ...formData,
                    interest: filteredValue,
                  });
                }}
                name="interest"
                placeholder="Enter Interest"
                className="mb-4"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Delivery Free Threshold
              </Typography>
              <Input
                size="lg"
                value={formData.deliveryFree}
                onChange={(e) => {
                  const { value } = e.target;
                  const filteredValue = value.replace(/[^1-9]/g, "");
                  setFormData({
                    ...formData,
                    deliveryFree: filteredValue,
                  });
                }}
                name="deliveryFree"
                placeholder="Enter Branch Name"
                className="mb-4"
              />
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Maximum Order Count
              </Typography>
              <Input
                type="text"
                size="lg"
                value={formData.order_count}
                onChange={(e) => {
                  const { value } = e.target;
                  const filteredValue = value.replace(/[^1-9]/g, "");
                  setFormData({
                    ...formData,
                    order_count: filteredValue,
                  });
                }}
                name="order_count"
                placeholder="Enter Order Count"
                className="mb-4"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleAddDelivery} className="mt-16" size="lg">
              Add Delivery
            </Button>
          </div>
        </div>
      )}
      <div className="border border-black size-max mt-20 mb-20 ml-72 text-gray-600 bg-gray-200 rounded-lg">
        <p className="m-3 font-light">
          <ul>
            <li>
              The delivery cost calculation is based on the total quantity of
              items being delivered.
            </li>
            <li>
              If the total quantity is below a specified threshold for free
              delivery:
            </li>
            <ul>
              <li>
                <b className="font-semibold">
                  A Normal delivery charge is applied.
                </b>
              </li>
            </ul>
            <li>If the total quantity exceeds the free delivery threshold:</li>
            <ul>
              <li>
                <b className="font-semibold">
                  An additional charge, calculated as a percentage of the Normal
                  charge, is added.
                </b>
              </li>
            </ul>
            <li>
              The total delivery cost is the sum of the Normal charge and any
              applicable additional charge.
            </li>
            <li>
              <b className="font-semibold p-6 ">
                Additional charge = Percentage * Delivery Free Threshold
              </b>
            </li>
            <li>
              <b className="font-semibold p-6">
                Total delivery cost = Normal charge + Additional charge
              </b>
            </li>
            <ul>
              <li>&nbsp;</li>
            </ul>
            <ul>
              <li>
                <b className="font-semibold">
                  Order count refers to the maximum number of orders used to
                  assign a task to a driver.
                </b>
              </li>
            </ul>
          </ul>
        </p>
      </div>
    </Card>
  );
}
