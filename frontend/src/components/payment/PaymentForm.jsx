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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
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

export default function PaymentForm({ orderId, mode, total_payment }) {
  const [type, setType] = React.useState("card");
  const [payment_amount, setTotalAmount] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [currentMode, setCurrentMode] = useState(mode);
  const [formTopic, setFormTopic] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [cashPaymentDetails, setCashPaymentDetails] = useState(null);
  const [cardPaymentDetails, setCardPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    account_number: "",
    exp: "",
    cvc: "",
    account_holder: "",
    payment_amount: "",
    district: "",
    address: "",
    nearest_town: "",
    postal_code: "",
  });

  const [paymentMade, setPaymentMade] = useState(false);

  const handleOpen = () => setOpen(!open);

  //Luhn Algorithm - To validate correct card number
  function isValidCardNumber(cardNumber) {
    // Remove all non-digit characters
    cardNumber = cardNumber.replace(/\D/g, "");

    // Convert the card number string into an array of digits
    const cardDigits = cardNumber.split("").map(Number);

    // Double every second digit starting from the right
    for (let i = cardDigits.length - 2; i >= 0; i -= 2) {
      let doubleDigit = cardDigits[i] * 2;

      // If doubling results in a two-digit number, subtract 9
      if (doubleDigit > 9) {
        doubleDigit -= 9;
      }

      // Replace the digit in the array with the doubled value
      cardDigits[i] = doubleDigit;
    }

    // Sum all the digits
    const sum = cardDigits.reduce((acc, digit) => acc + digit, 0);

    // If the sum modulo 10 equals 0, the card number is valid
    return sum % 10 === 0;
  }

  const handleSetPaymentMethodCash = () => {
    setPaymentMethod("cash");
  };

  const handleSetPaymentMethodCard = () => {
    setPaymentMethod("card");
  };

  //changing button text using state
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

  //handling onchange inputs
  const handleChangeSelect = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  //validation to prevent user entering symbols except @
  const handleKeyPress = (e) => {
    // If the pressed key is not a letter, digit, or '@', prevent the default action
    if (!/[a-zA-Z0-9@]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleKeyPressName = (e) => {
    // If the pressed key is not a letter, digit, or '@', prevent the default action
    if (!/[a-zA-Z0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert email input value to lowercase before updating the state
    if (name === "email") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.toLowerCase(),
      }));
    } else if (name === "account_number") {
      const newValue = value.replace(/\D/g, "");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  //delete payment function
  const handleDeletePayment = () => {
    setCurrentMode("delete");
  };

  useEffect(() => {
    handleSetFormTopic();
    if (currentMode === "create") {
      //if the mode is create
      const fetchPaymentAmount = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8070/Payment/payment/${orderId}`
          );
          const { totalAmount } = response.data;
          setTotalAmount(totalAmount);
        } catch (error) {
          setError("Error fetching payment amount");
        }
      };

      fetchPaymentAmount();
    }

    if (currentMode === "update") {
      //if the mode is update
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
              payment_amount: total_payment,
              district: paymentData.cardPayment.district,
              nearest_town: paymentData.cardPayment.nearest_town,
            });
          }
          if (paymentData.cashPayment) {
            setCashPaymentDetails(paymentData.cashPayment);
            setFormData({
              ...formData,
              email: paymentData.cashPayment.email,
              payment_amount: total_payment,
              district: paymentData.cashPayment.district,
              address: paymentData.cashPayment.address,
              postal_code: paymentData.cashPayment.postal_code,
              nearest_town: paymentData.cashPayment.nearest_town,
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

      // // Validate card number - test
      if (
        paymentMethod === "card" &&
        !isValidCardNumber(formData.account_number)
      ) {
        setError("Invalid card number");
        setAlertMessage("Add a valid Card Number");
        setLoading(false);
        setShowAlert(true);
        return;
      }

      console.log("Before: ", paymentMade);
      let successMessage = "";
      if (currentMode === "create") {
        if (paymentMade) {
          //validate whether payment is already done
          // Check if payment has already been made
          setError("Payment has already been made for this order.");
          setLoading(false);
          setShowAlert(true);
          return; // Prevent further execution
        }

        if (paymentMethod === "card") {
          await axios
            .post(
              `http://localhost:8070/Payment/pay-card/${orderId}/add-payment`,
              formData
            )
            .then(() => {
              console.log("Payment successful. Updating paymentMade...");
              setPaymentMade(true);
            });
          setPaymentMade(true);
        } else if (paymentMethod === "cash") {
          await axios
            .post(
              `http://localhost:8070/Payment/pay-cash/${orderId}/add-payment`,
              formData
            )
            .then(() => {
              console.log("Payment successful. Updating paymentMade...");
              setPaymentMade(true); // Update paymentMade after successful payment
            });
        }

        successMessage = "Payment Added Successfully!";
        // Set paymentMade to true after successful payment
        console.log("After: ", paymentMade);
      } else if (currentMode === "update") {
        if (cardPaymentDetails && paymentMethod === "card") {
          successMessage = "You can't update card payments."; //card payments cannot be updated
          handleOpen();
        } else if (cashPaymentDetails && paymentMethod === "cash") {
          await axios.put(
            `http://localhost:8070/Payment/pay-cash/${orderId}/update-payment/${cashPaymentDetails._id}`,
            formData
          );
          successMessage = "Payment Updated Successfully!";
        }
      } else if (currentMode === "delete") {
        if (cardPaymentDetails && paymentMethod === "card") {
          successMessage = "You can't delete card payments.";
          handleOpen();
        } else if (cashPaymentDetails && paymentMethod === "cash") {
          await axios.delete(
            `http://localhost:8070/Payment/pay-cash/${orderId}/delete-payment/${cashPaymentDetails._id}`
          );
          successMessage = "Payment Removed!";
        }
      }

      console.log(successMessage);
      setLoading(false);
      setAlertMessage(successMessage);
      setShowAlert(true);
    } catch (error) {
      console.error("Error updating payment details:", error);
      setError("An error occurred while updating payment details.");
      setLoading(false);
      setAlertMessage("An error occurred while updating payment details.");
      setShowAlert(true);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-4 text-center"
        >
          <div className="mb-4 h-10  text-white">
            {type === "card" ? (
              <CreditCardIcon className="h-10 w-10 text-white" />
            ) : (
              <img
                alt="paypal"
                className="w-14"
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
            <TabsHeader className="relative z-0">
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
                <form onSubmit={handleSubmit}>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-medium pt-5"
                  >
                    Card Details
                  </Typography>
                  <div className="mt-5 flex flex-col gap-4 pr-5">
                    <div className="inline-flex  gap-4">
                      <div className="w-full md:w-1/2">
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
                            onKeyPress={handleKeyPress}
                            required
                            style={{ width: "300px" }}
                            placeholder="name@mail.com"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className:
                                "before:content-none after:content-none",
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2">
                        <div className="flex flex-col">
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
                            onKeyPress={handleKeyPressName}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className:
                                "before:content-none after:content-none",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex gap-4">
                      {" "}
                      <div className="flex flex-col w-1/3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Card Number
                        </Typography>
                        <Input
                          id="account_number"
                          name="account_number"
                          maxLength={19}
                          value={formatCardNumber(formData.account_number)}
                          onKeyPress={handleKeyPress}
                          onChange={handleChange}
                          required
                          icon={
                            <CreditCardIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />
                          }
                          placeholder="0000 0000 0000 0000"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                      {/*exp*/}
                      <div className="flex flex-col w-1/3">
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
                          onKeyPress={handleKeyPress}
                          placeholder="00/00"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                      {/*cvc*/}
                      <div className="flex flex-col w-1/3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          CVV
                        </Typography>
                        <Input
                          maxLength={3}
                          name="cvc"
                          required
                          value={formData.cvc}
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          placeholder="000"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                    </div>

                    <div className="inline-flex gap-4">
                      <div className="flex flex-col w-1/2">
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
                      </div>
                      <div className="flex flex-col w-1/2">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Nearest Town
                        </Typography>
                        <Input
                          type="nearest_town"
                          id="nearest_town"
                          name="nearest_town"
                          value={formData.nearest_town}
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          required
                          placeholder="Enter nearest town"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                    </div>

                    <Button
                      title="Submit"
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
                      <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments
                      are secure and encrypted
                    </Typography>
                  </div>
                </form>
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <form
                  className="mt-6 flex flex-col gap-4 pr-5"
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
                      onKeyPress={handleKeyPress}
                      required
                      placeholder="name@mail.com"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className=" font-medium"
                  >
                    Billing Address
                  </Typography>

                  <div className="inline-flex gap-3">
                    {/* District */}
                    <div className="w-full md:w-1/3 ">
                      <div className="flex flex-col">
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
                      </div>
                    </div>

                    {/* Nearest Town */}
                    <div className="w-full md:w-1/3 ">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Nearest Town
                        </Typography>
                        <Input
                          type="text"
                          id="nearest_town"
                          name="nearest_town"
                          value={formData.nearest_town}
                          onKeyPress={handleKeyPress}
                          onChange={handleChange}
                          required
                          placeholder="Enter Your Nearest Town"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                    </div>

                    {/* Postal Code */}
                    <div className="w-full md:w-1/3  ">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Postal Code
                        </Typography>
                        <Input
                          id="postal_code"
                          name="postal_code"
                          value={formData.postal_code}
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          required
                          placeholder="00000"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Address
                      </Typography>
                      <Input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        required
                        placeholder="Enter Your Address"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
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

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="text-center">
          You Can't Update or Remove Card Payments
        </DialogHeader>
        <DialogBody>
          You cant update or remove card payments when its already made. if you
          have issues, please contact your bank for assistance.
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
