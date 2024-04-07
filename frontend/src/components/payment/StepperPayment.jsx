import React from "react";
import { Stepper, Step } from "@material-tailwind/react";
import { HomeIcon, CogIcon, UserIcon } from "@heroicons/react/24/outline";

export function StepperPayment({ activeStepParam }) {
  const [activeStep, setActiveStep] = React.useState(activeStepParam || 0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  React.useEffect(() => {
    setActiveStep(activeStepParam || 0);
  }, [activeStepParam]);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => handleStepClick(0)}>
          <a href="/payment">
            <HomeIcon className="h-5 w-5" />
          </a>
        </Step>
        <Step onClick={() => handleStepClick(1)}>
          <a href="/payment_view">
            <UserIcon className="h-5 w-5" />
          </a>
        </Step>
        <Step onClick={() => handleStepClick(2)}>
          <a href="/signin">
            <CogIcon className="h-5 w-5" />
          </a>
        </Step>
      </Stepper>
      <div className="mt-16 flex justify-between"></div>
    </div>
  );
}
