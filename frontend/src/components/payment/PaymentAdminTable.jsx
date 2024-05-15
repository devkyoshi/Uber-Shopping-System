import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Input,
  Alert,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DownloadButton } from "./DownloadButton";

export function PaymentAdminTable() {
  const [searchInput, setSearchInput] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch payments data from the backend
    axios
      .get("http://localhost:8070/Payment/payments")
      .then((response) => {
        setPayments(response.data);
        console.log(response.data);
        console.log("Search State: ", searchInput);
        setLoading(false); // Set loading to false after successful fetch
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        setError(error); // Set error state
        setLoading(false); // Set loading to false on error
      });
  }, []); // Empty dependency array to ensure effect runs only once

  const filteredPayments = payments.filter((payment) => {
    const searchValue = searchInput.toLowerCase();
    // Convert each payment object to an array of its values
    const paymentValues = Object.values(payment).map((value) =>
      typeof value === "string" ? value.toLowerCase() : ""
    );
    // Check if any of the values in the payment object contain the search input
    return paymentValues.some((value) => value.includes(searchValue));
  });

  if (loading) {
    return (
      <div>
        {" "}
        <Card className="mt-6 w-96 animate-pulse">
          <CardHeader
            shadow={false}
            floated={false}
            className="relative grid h-56 place-items-center bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-12 w-12 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </CardHeader>
          <CardBody>
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-56 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-full rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-full rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-full rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-full rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              disabled
              tabIndex={-1}
              className="h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
            >
              &nbsp;
            </Button>
          </CardFooter>
        </Card>
      </div>
    ); // Show loading indicator
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show error message
  }

  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );
  // Function to handle Next button click
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  // Function to handle Previous button click
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset current page when search input changes
  };
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  return (
    <TransactionsTable
      totalPages={totalPages}
      payments={currentPayments}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      onNextClick={handleNextClick}
      onPrevClick={handlePrevClick}
      onSearchInputChange={handleSearchInputChange}
      searchInput={searchInput}
    />
  );
}

export function TransactionsTable({
  payments,
  currentPage,
  itemsPerPage,
  onNextClick,
  onPrevClick,
  totalPages,
  onSearchInputChange,
  searchInput,
}) {
  const TABLE_HEAD = [
    // "Order ID",
    // "Payment ID",
    "Total Payment",
    "Payment Method",
    "Status",
    "City",
    "District",
    "Paid Time",
    "Email",
  ];

  return (
    <Card className="h-full w-full p-5" style={{ width: "900px" }}>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="pl-2">
            <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={onSearchInputChange}
                value={searchInput}
              />
            </div>
            <DownloadButton data={payments} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 font-bold"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map(
              ({
                _id,
                order_id, // Corrected variable name
                payment_method,
                payment_id,
                email,
                payment_amount,
                paid_time,
                payment_status,
                nearest_town,
                district,
              }) => (
                <tr key={_id}>
                  {/* <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {order_id}
                    </Typography>
                  </td> */}
                  {/* <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {payment_id}
                    </Typography>
                  </td> */}
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      Rs.
                      {payment_amount}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={
                          payment_method === "card"
                            ? "Card Payment"
                            : "Cash on Delivery"
                        }
                        color={payment_method === "card" ? "green" : "amber"}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={payment_status}
                        color={
                          payment_status === "Paid"
                            ? "green"
                            : payment_status === "Pending"
                            ? "amber"
                            : "red"
                        }
                      />
                    </div>
                  </td>

                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {district}
                    </Typography>
                  </td>

                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {nearest_town}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(paid_time).toLocaleString()}{" "}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          size="sm"
          onClick={onPrevClick}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            // Determine if the current page should be displayed
            const displayPage =
              index + 1 === 1 || // Always display the first page
              index + 1 === totalPages || // Always display the last page
              Math.abs(currentPage - (index + 1)) <= 1 || // Display pages within 1 page of the current page
              index + 1 === currentPage - 2 || // Display pages that are 2 pages before the current page
              index + 1 === currentPage + 2; // Display pages that are 2 pages after the current page

            // Render the page button
            return (
              displayPage && (
                <IconButton
                  key={index + 1}
                  variant="text"
                  size="sm"
                  className={
                    currentPage === index + 1 ? "font-bold text-blue-500" : ""
                  }
                >
                  {index + 1}
                </IconButton>
              )
            );
          })}
        </div>

        <Button
          variant="outlined"
          size="sm"
          onClick={onNextClick}
          disabled={payments.length < itemsPerPage}
          className="ml-2"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
