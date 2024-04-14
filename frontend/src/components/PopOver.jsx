import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
} from "@material-tailwind/react";

import { InputBox } from "./InputBox";

export function PopOver({ supermarket, itemID }) {
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
          View Product
        </Button>
      </PopoverHandler>
      <PopoverContent className="w-96 shadow-lg">
        <Typography variant="h6" color="blue-gray" className="mb-5 ml-20 px-12">
          Order Item
        </Typography>

        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-bold"
        >
          {" "}
          Item ID{" "}
        </Typography>
        <div className=" gap-2 flex-row">
          <InputBox
            label=""
            icon={<i className="fas fa heart" />}
            placeholder={"Item ID"}
            value={itemID}
          />
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-bold pt-2"
          >
            {" "}
            Quantity{" "}
          </Typography>
          <InputBox
            label=""
            icon={<i className="fas fa heart" />}
            placeholder={"Quantity"}
            type={"number"}
          />
          <div className="pt-4 items-center justify-center">
            <Button variant="gradient" className="flex-shrink-0">
              Subscribe
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
