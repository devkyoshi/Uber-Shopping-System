import payImg from "../../img/payment_img.jpg";
export function PaymentImage() {
  return (
    <img
      className="h-96 w-96 rounded-lg object-cover object-center"
      src={payImg}
      alt="nature image"
    />
  );
}
