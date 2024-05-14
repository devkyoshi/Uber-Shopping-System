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
          [fieldName]: value,
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
    try {
      const response = await axios.post(
        "http://localhost:8070/Delivery/delivery-add",
        formData
      );
      const newDelivery = response.data;
      setDelivers([...delivers, newDelivery]);
      setShowAddForm(false);
      setFormData({
        chargePrice: "",
        deliveryFree: "",
        interest: "",
      });
    } catch (error) {
      console.error("Error adding delivery:", error);
      setErrorMessage("Error adding delivery");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Card className="h-full w-full">
      {delivers.length === 0 && !showAddForm && (
        <div>
          <div className="grid grid-cols-2 gap-8 ">
            <div className="flex flex-col gap-2">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Charge Price
              </Typography>
              <Input
                size="lg"
                value={formData.chargePrice}
                onChange={(e) => {
                  const { value } = e.target;
                  const filteredValue = value.replace(/[^0-9]/g, "");
                  setFormData({
                    ...formData,
                    chargePrice: filteredValue,
                  });
                }}
                name="chargePrice"
                placeholder="Enter Charge Price "
                className="mb-4"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Delivery Free
              </Typography>
              <Input
                size="lg"
                value={formData.deliveryFree}
                onChange={(e) => {
                  const { value } = e.target;
                  const filteredValue = value.replace(/[^0-9]/g, "");
                  setFormData({
                    ...formData,
                    deliveryFree: filteredValue,
                  });
                }}
                name="deliveryFree"
                placeholder="Enter Branch Name"
                className="mb-4"
              />
              <div className="mt-10">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Interest
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  value={formData.interest}
                  onChange={(e) => {
                    const { value } = e.target;
                    const filteredValue = value.replace(/[^0-9]/g, "");
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
            </div>
          </div>
          <Button onClick={handleAddDelivery}>Add Delivery</Button>
        </div>
      )}
      {delivers.length > 0 && (
        <table className="w-full min-w-0 table-auto text-center">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  style={{ fontWeight: "bolder" }}
                  className="font-normal leading-none opacity-70 text-center"
                >
                  Charge Price
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  style={{ fontWeight: "bolder" }}
                  className="font-normal leading-none opacity-70 text-center"
                >
                  Delivery Free
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  style={{ fontWeight: "bolder" }}
                  className="font-normal leading-none opacity-70 text-center"
                >
                  Interest
                </Typography>
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
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
              <tr key={deliver._id}>
                <td className="pl-3">
                  <Input
                    type="text"
                    value={deliver.chargePrice}
                    onChange={(e) =>
                      handleInputChange(e, deliver._id, "chargePrice")
                    }
                    disabled={!deliver.editMode}
                  />
                </td>
                <td className="pl-3">
                  <Input
                    type="text"
                    value={deliver.deliveryFree}
                    onChange={(e) =>
                      handleInputChange(e, deliver._id, "deliveryFree")
                    }
                    disabled={!deliver.editMode}
                  />
                </td>
                <td className="pl-3">
                  <Input
                    type="text"
                    value={deliver.interest}
                    onChange={(e) =>
                      handleInputChange(e, deliver._id, "interest")
                    }
                    disabled={!deliver.editMode}
                  />
                </td>
                <td className="pl-4">{renderSaveOrEditButton(deliver._id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}
