import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function DeliveryCard() {
  return (
    <div className="flex justify-center w-112">
      <Card className="mt-6 w-96 bg-gray-300 pb-7">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Delivery Details
          </Typography>
          <Typography variant="paragraph" color="gray" className="mb-2">
            Delivery Address: <br></br>
          </Typography>
          <Typography variant="paragraph" color="gray">
            Delivery Method:
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="bg-green-700 hover:bg-green-900">
            Edit Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}