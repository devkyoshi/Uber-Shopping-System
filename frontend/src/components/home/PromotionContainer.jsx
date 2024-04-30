import { Carousel } from "@material-tailwind/react";

export function PromotionContainer() {
  return (
    <div className="px-10 py-8">
      <Carousel loop={true} autoplay={true} className="rounded-xl">
        <img
          src="https://downloadpsd.cc/wp-content/uploads/2020/07/Free-Discount-Coupons-Template-PSD.jpg"
          alt="image 1"
          className="object-cover object-center"
          style={{ height: "50vh", width: "100%" }}
        />
        <img
          src="https://freedesignfile.com/upload/2019/01/Sale-Discount-Coupon-PSD-Template.jpg"
          alt="image 2"
          className="object-cover object-center"
          style={{ height: "50vh", width: "100%" }}
        />
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/179/076/original/vector-biggest-sale-offers-and-discount-banner-template-for-promotion.jpg"
          alt="image 3"
          className="object-cover object-center"
          style={{ height: "50vh", width: "100%" }}
        />
      </Carousel>
    </div>
  );
}
