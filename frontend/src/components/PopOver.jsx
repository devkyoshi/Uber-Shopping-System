import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Input,
    Typography,
  } from "@material-tailwind/react";

  import { InputBox } from "./InputBox";
   
  export function PopOver() {
    return (
      <Popover placement="bottom">
        <PopoverHandler>
          <Button>View Product</Button>
        </PopoverHandler>
        <PopoverContent className="w-96">
          
          <Typography variant="h6" color="blue-gray" className="mb-6">
            Order Item
          </Typography>

          <Typography variant="small"color="blue-gray"className="mb-1 font-bold" > Your Name </Typography>
            <div className=" gap-2">
            <InputBox label = "" icon = {<i className="fas fa heart"/>} place/>
            <Typography variant="small"color="blue-gray"className="mb-1 font-bold" > Your Name </Typography>
            <InputBox />
            <Button variant="gradient" className="flex-shrink-0">Subscribe</Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }