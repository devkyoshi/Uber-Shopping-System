import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import { CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { AlertBox } from "./AlertBox";

const districts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

const formatCardNumber = (value) => {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

function formatExpires(value) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

//export function
export default function PaymentForm({ orderId, mode }) {
  const [type, setType] = React.useState("card");

  const [formData, setFormData] = useState({
    email: "",
    account_number: "",
    exp: "",
    cvc: "",
    account_holder: "",
    payment_amount: "",
    district: "",
    address: "",
    postal_code: "",
  });

  const [currentMode, setCurrentMode] = useState(mode);
  const [formTopic, setFormTopic] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [cashPaymentDetails, setCashPaymentDetails] = useState(null);
  const [cardPaymentDetails, setCardPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const [showAlert, setShowAlert] = useState(false); // State for controlling alert visibility

  const handleSetPaymentMethodCash = () => {
    setPaymentMethod("cash");
  };
  const handleSetPaymentMethodCard = () => {
    setPaymentMethod("card");
  };

  const handleSetFormTopic = () => {
    if (currentMode === "create") {
      setButtonName("Make Payment");
      setFormTopic("Add Payment Section");
    } else if (currentMode === "update") {
      setButtonName("Update Payment");
      setFormTopic("Update Payment Section");
    } else if (currentMode === "delete") {
      setButtonName("Delete Payment");
      setFormTopic("Delete Payment Section");
    }
  };

  //SELECT OPTION THINGY
  const handleChangeSelect = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeletePayment = () => {
    setCurrentMode("delete");
  };

  useEffect(() => {
    handleSetFormTopic();

    if (currentMode === "update") {
      const fetchPaymentDetails = async () => {
        console.log("currentMode: ", currentMode);
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:8070/Payment/payment/${orderId}`
          );
          const paymentData = response.data;

          if (paymentData.cardPayment) {
            setCardPaymentDetails(paymentData.cardPayment);
            setFormData({
              ...formData,
              email: paymentData.cardPayment.email,
              account_number: paymentData.cardPayment.account_number,
              exp: paymentData.cardPayment.exp,
              cvc: paymentData.cardPayment.cvc,
              account_holder: paymentData.cardPayment.account_holder,
              payment_amount: paymentData.cardPayment.payment_amount,
            });
          }
          if (paymentData.cashPayment) {
            setCashPaymentDetails(paymentData.cashPayment);
            setFormData({
              ...formData,
              email: paymentData.cashPayment.email,
              payment_amount: paymentData.cashPayment.payment_amount,
              district: paymentData.cashPayment.district,
              address: paymentData.cashPayment.address,
              postal_code: paymentData.cashPayment.postal_code,
            });
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching payment details:", error);
          setError("An error occurred while fetching payment details.");
          setLoading(false);
        }
      };
      fetchPaymentDetails();
    }
  }, [currentMode, orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let successMessage = "";
      if (currentMode === "create") {
        // Make a POST request to create a new payment
        if (paymentMethod == "card") {
          await axios.post(
            `http://localhost:8070/Payment/pay-card/${orderId}/add-payment`,
            formData
          );
        }

        if (paymentMethod == "cash") {
          await axios.post(
            `http://localhost:8070/Payment/pay-cash/${orderId}/add-payment`,
            formData
          );
        }

        successMessage = "Payment Added SuccessFully!";
      } else if (currentMode === "update") {
        // Make a PUT request to update the existing payment
        if (cardPaymentDetails) {
          await axios.put(
            `http://localhost:8070/Payment/pay-card/${orderId}/update-payment/${cardPaymentDetails._id}`,
            formData
          );
        } else if (cashPaymentDetails) {
          await axios.put(
            `http://localhost:8070/Payment/pay-cash/${orderId}/update-payment/${cashPaymentDetails._id}`,
            formData
          );
        }
        successMessage = "Payment Updated SuccessFully!";
      } else if (currentMode == "delete") {
        if (cardPaymentDetails) {
          await axios.delete(
            `http://localhost:8070/Payment/pay-card/${orderId}/delete-payment/${cardPaymentDetails._id}`
          );
        } else if (cashPaymentDetails) {
          await axios.delete(
            `http://localhost:8070/Payment/pay-cash/${orderId}/delete-payment/${cashPaymentDetails._id}`
          );
        }
        successMessage = "Payment Removed!";
      }

      // Handle success
      console.log(successMessage);
      setLoading(false);
      setAlertMessage(successMessage);
      setShowAlert(true);
    } catch (error) {
      // Handle error
      console.error("Error updating payment details:", error);
      setError("An error occurred while updating payment details.");
      setLoading(false);
      setAlertMessage("An error occurred while updating payment details.");
      setShowAlert(true);
    }
  };

  return (
    <div className="pt-5 pl-20 " style={{ width: "35rem" }}>
      <Card className="w-full h-full max-w-[30rem] ">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-4 text-center"
        >
          <div className="mb-4 h-20 p-6 text-white">
            {type === "card" ? (
              <CreditCardIcon className="h-10 w-10 text-white" />
            ) : (
              <img
                alt="paypal "
                className="w-14 "
                src="https://docs.material-tailwind.com/icons/paypall.png"
              />
            )}
          </div>

          <Typography variant="h5" color="white">
            {formTopic}
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0 ">
              <Tab value="card" onClick={() => setType("card")}>
                Pay with Card
              </Tab>
              <Tab value="paypal" onClick={() => setType("paypal")}>
                Cash On Delivery
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-visible"
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="card" className="p-0">
                <form
                  className="mt-12 flex flex-col gap-4 pr-5"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Your Email
                    </Typography>

                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div className="my-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium "
                    >
                      Card Details
                    </Typography>

                    <Input
                      id="account_number"
                      name="account_number"
                      maxLength={19}
                      value={formatCardNumber(formData.account_number)}
                      onChange={handleChange}
                      required
                      icon={
                        <CreditCardIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />
                      }
                      placeholder="0000 0000 0000 0000"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <div className="my-4 flex items-center gap-4">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Expires
                        </Typography>
                        <Input
                          maxLength={5}
                          name="exp"
                          required
                          value={formatExpires(formData.exp)}
                          onChange={handleChange}
                          containerProps={{ className: "min-w-[72px]" }}
                          placeholder="00/00"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          CVC
                        </Typography>
                        <Input
                          maxLength={4}
                          name="cvc"
                          required
                          value={formData.cvc}
                          onChange={handleChange}
                          containerProps={{ className: "min-w-[72px]" }}
                          placeholder="000"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                    </div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Holder Name
                    </Typography>
                    <Input
                      type="text"
                      name="account_holder"
                      value={formData.account_holder}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <Button
                    size="lg"
                    type="submit"
                    className="hover:bg-black"
                    onClick={handleSetPaymentMethodCard}
                  >
                    {buttonName}
                  </Button>
                  {currentMode === "update" && (
                    <Button
                      size="lg"
                      type="button"
                      className="bg-red-600 hover:bg-red-800"
                      onClick={handleDeletePayment}
                    >
                      Delete Payment
                    </Button>
                  )}
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                    secure and encrypted
                  </Typography>
                </form>
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <form
                  className="mt-12 flex flex-col gap-4  pr-5"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      Personal Details
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Your Email
                    </Typography>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div className="my-6">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      Billing Address
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      District
                    </Typography>
                    <Select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={(value) =>
                        handleChangeSelect(value, "district")
                      }
                      required
                      placeholder="Select a district"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      menuProps={{ className: "h-48" }}
                    >
                      {districts.map((district, index) => (
                        <Option key={index} value={district}>
                          <div className="flex items-center gap-x-2">
                            {district}
                          </div>
                        </Option>
                      ))}
                    </Select>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium pt-4"
                    >
                      Address
                    </Typography>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Enter Your Address"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mt-4 -mb-2 font-medium"
                    >
                      Postal Code
                    </Typography>
                    <Input
                      id="postal_code"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      required
                      placeholder="00000"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{ className: "mt-4" }}
                    />
                  </div>
                  <Button
                    size="lg"
                    onClick={handleSetPaymentMethodCash}
                    type="submit"
                  >
                    {buttonName}
                  </Button>
                  {currentMode === "update" && (
                    <Button
                      size="lg"
                      type="button"
                      className="bg-red-600 hover:bg-red-800"
                      onClick={handleDeletePayment}
                    >
                      Delete Payment
                    </Button>
                  )}
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-center gap-2 font-medium opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                    secure and encrypted
                  </Typography>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>

      {showAlert && <AlertBox message={alertMessage} />}
    </div>
  );
}
