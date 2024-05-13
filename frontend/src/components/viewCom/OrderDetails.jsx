import React from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

export function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  return (
    <section>
      <div className="px-5 grid h-screen place-items-center">
        <Card>
          <CardBody className=" ">
            {" "}
            {/**md:p-20*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              />
            </svg>
            <Typography color="black" className="mb-4 mt-4" variant="h2">
              Your Order Details
            </Typography>
            <Typography
              variant="lead"
              className="leading-loose text-gray-700 tracking-wide"
            >
              <span className="font-medium text-gray-900">
                Order Date: {location.state?.order_date}
              </span>{" "}
              <br />
              <span className="font-medium text-gray-900">
                Order District: {location.state?.order_district}
              </span>{" "}
              <br />
              <span className="font-medium text-gray-900">
                Order Status: {location.state?.order_status}
              </span>{" "}
              <br />
              <span className="font-medium text-gray-900">
                Additional Notes: {location.state?.additional_notes}
              </span>{" "}
              <br />
              <span className="font-medium text-gray-900">
                Purchase Amount: {location.state?.purchase_amount}
              </span>{" "}
              <br /> <br />
              <span className="font-bold text-gray-900">
                Total Amount: Rs.{location.state?.total_amount}
              </span>
              <br />
            </Typography>
            <div className="flex !gap-4 mt-12">
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  navigate("/orders", { replace: true });
                }}
              >
                back
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
