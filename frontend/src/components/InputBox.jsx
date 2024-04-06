import React from 'react';
import { Input as TailwindInput } from "@material-tailwind/react";

export function InputBox({ label, icon, name , value , onChange , placeholder}) {
  return (
    <div className="w-72">
      <TailwindInput label={label} icon={icon}  onChange = {onChange} name={name} placeholder={placeholder} value={value} size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}/>
    </div>
  );
}
