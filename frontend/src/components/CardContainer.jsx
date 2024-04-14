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
    <Card className="w-96 h-auto">
      <CardHeader shadow={false} floated={false} className="h-60">
        <img
          src={itemImage}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="flex flex-col justify-between">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-bold">
            {itemName}
          </Typography>
          <Typography color="green" className="font-bold">
            Rs. {formatPriceWithCommas(price)}
          </Typography>
        </div>
        <div className="overflow-hidden">
          <Typography
            variant="small"
            color="gray"
            className={`font-normal opacity-75 ${
              isExpanded ? "h-auto" : "h-20"
            }`}
          >
            {description}
          </Typography>
        </div>
        {!isExpanded && (
          <Typography
            color="gray"
            onClick={toggleDescription}
            className="cursor-pointer mt-2 fon"
          >
            Read More
          </Typography>
        )}
      </CardBody>
      <CardFooter className="pt-0 items-center justify-center ml-20 pl-10">
        <PopOver
          supermarket={supermarket}
          itemID={itemID}
          size="lg"
          fullWidth={true}
          isOpen={isPopOverOpen}
          togglePopover={togglePopOver}
        />
      </CardFooter>
    </Card>
  );
}
