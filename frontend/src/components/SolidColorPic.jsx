import React from "react";
import delivery from "../img/delivery.jpg";
import service from "../img/service.jpg";
import carrot from "../img/carrot.jpg";
import salad from "../img/salad.jpg";
import veg from "../img/veg.jpg";

export function SolidColorPic() {
  return (
    <div className="solid-color-pic h-44">
      <img src={service} alt="service" className="service-img" />
      <img src={carrot} alt="carrot" className="carrot-img" />
      <img src={salad} alt="salad" className="salad-img" />
      <img src={veg} alt="salad" className="veg-img" />
      <div className="text-middle pl-10">
        <h2>About Uber Shopping</h2>
        <p>A convenient way to shop for groceries</p>
      </div>
    </div>
  );
}
