import React from "react";
import { SolidColorPic } from "../components/SolidColorPic";
import { AboutCard } from "../components/about/AboutCards";
import deliveryImage from "../img/deliveryperson.jpg";
import shoppingImg from "../img/shopping.jpg";
import joinUs from "../img/joinUs.jpg";

export default function About() {
  const desc1 = `We understand that life can be busy, and finding time to
      shop for groceries can be a challenge. That is where we come in. Our team
      works tirelessly to handpick the freshest and highest-quality products for
      you. From farm-fresh produce to pantry staples and gourmet treats, we've
      got everything you need to create delicious meals and memorable moments at
      home.`;

  const desc2 =
    "When you shop with Uber Shopping you can expect more than just \
groceries. You can expect exceptional service from start to finish. Our\
dedicated team is here to assist you with any questions or special\
requests you may have. We're here to make your shopping experience a\
breeze by helping you to pick groceries effectively and wisely.";

  const desc3 =
    " We invite you to join us on our mission to share love through grocery delivery. Whether you're busy parent, a working professional, or simply someone who appreciates the convenience of having fresh groceries delivered to your door, we're here to save you. Thank you for choosing Uber.Shopping as your trusted partner in nourishing your family and spreading love, one delivery at a time.";

  return (
    <div className="inner-layout bg">
      <SolidColorPic />
      <h3 className="ourM">Our Mission</h3>
      <p className="share">"To share love through grocery deliveries"</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AboutCard
          topic={"Quality Products, Delivered with Care"}
          description={desc1}
          btnName={"Read More"}
          image={deliveryImage}
        />
        <AboutCard
          topic={"Exceptional Service, Every Step of the Way"}
          description={desc2}
          btnName={"Read More"}
          image={shoppingImg}
        />
        <AboutCard
          topic={"Join us on Our Journey"}
          description={desc3}
          btnName={"Read More"}
          image={joinUs}
        />
      </div>
    </div>
  );
}
