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
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
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
    return (
      payment.order_id.toLowerCase().includes(searchValue) ||
      payment.payment_id.toLowerCase().includes(searchValue) ||
      payment.email.toLowerCase().includes(searchValue)
    );
  });

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
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
    "Order ID",
    "Payment ID",
    "Total Payment",
    "Payment Method",
    "Status",
    "City",
    "District",
    "Paid Time",
    "Email",
  ];

  return (
    <Card className="h-full w-full" style={{ width: "900px" }}>
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
        <table className="w-full min-w-max table-auto m-5 text-center">
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
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {order_id}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {payment_id}
                    </Typography>
                  </td>
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
