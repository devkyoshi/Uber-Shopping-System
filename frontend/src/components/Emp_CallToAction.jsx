import React from "react";
import { Button } from "flowbite-react";
import { Typography } from "@material-tailwind/react";

export default function Emp_CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <Typography variant="h2" className="text-2xl">
          Elevating team morale in our online delivery system
        </Typography>
        <Typography className="text-gray-500 my-2">
          Want to know how? Check out the link below
        </Typography>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <Typography color="black" className="text-xl">
            <a
              href="https://teambuilding.com/blog/morale-boosters"
              target="_blank"
              rel="noopener noreferrer"
            >
              Boost Morale & Motivation
            </a>
          </Typography>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://www.atlantaparent.com/wp-content/uploads/2020/03/iStock-1214541379-scaled.jpg" />
      </div>
    </div>
  );
}
