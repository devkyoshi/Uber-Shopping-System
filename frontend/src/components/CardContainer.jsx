import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { PopOver } from "./PopOver";

export function CardContainer({
  supermarket,
  itemName,
  price,
  description,
  itemImage,
  itemID,
}) {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePopOver = () => {
    setIsPopOverOpen(!isPopOverOpen);
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const formatPriceWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Card className="w-72 h-auto">
      <CardHeader shadow={false} floated={false} className="h-40">
        <img
          src={itemImage}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="flex flex-col justify-between">
        <div className="mb-1 flex items-center justify-between">
          <Typography color="blue-gray" className="font-bold text-sm">
            {itemName}
          </Typography>
          <Typography color="green" className="font-bold text-sm">
            Rs. {formatPriceWithCommas(price)}
          </Typography>
        </div>
        <div className="overflow-hidden">
          <Typography
            variant="small"
            color="gray"
            className={`font-normal opacity-75 ${
              isExpanded ? "h-auto" : "h-16"
            } text-sm`}
          >
            {description}
          </Typography>
        </div>
        {!isExpanded && (
          <Typography
            color="gray"
            onClick={toggleDescription}
            className="cursor-pointer mt-1 font-medium text-sm"
          >
            Read More
          </Typography>
        )}
      </CardBody>
      <CardFooter className="pt-0 items-center justify-center ml-10">
        <PopOver
          supermarket={supermarket}
          itemID={itemID}
          size="md"
          fullWidth={true}
          isOpen={isPopOverOpen}
          togglePopover={togglePopOver}
        />
      </CardFooter>
    </Card>
  );
}
