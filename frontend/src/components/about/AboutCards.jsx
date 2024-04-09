import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function AboutCard({ topic, description, btnName, image }) {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={image} alt="card-image" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
          {topic}
        </Typography>
        <Typography className="text-justify pt-2"> {description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>{btnName}</Button>
      </CardFooter>
    </Card>
  );
}
