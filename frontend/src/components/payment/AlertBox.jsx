import React from "react";
import { Alert } from "@material-tailwind/react";

export function AlertBox({ message }) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "9999",
        width: "300px",
      }}
    >
      <Alert open={open} onClose={() => setOpen(false)}>
        {message}
      </Alert>
    </div>
  );
}
