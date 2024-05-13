import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CardContainer } from "../components/CardContainer";
import { PromotionContainer } from "../components/home/PromotionContainer";
import {
  Typography,
  IconButton,
  Popover,
  Badge,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [cart, setCart] = useState([]); // State for the cart
  const [groceries, setGroceries] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);
  const [bakery, setBakery] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentCustomer } = useSelector((state) => state.customer);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch item details when the component mounts
    fetchItemDetails("Groceries");
    fetchItemDetails("Electronics");
    fetchItemDetails("Fruits");
    fetchItemDetails("Vegetables");
    fetchItemDetails("Bakery");
    fetchItemDetails("Pharmacy");
  }, []);

  const fetchItemDetails = async (itemType) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/Supermarket/grouped-items/${itemType}`
      );
      const data = response.data;
      console.log("Item:", response.data);

      if (data.length > 0) {
        if (itemType === "Groceries") {
          setGroceries(data);
        } else if (itemType === "Electronics") {
          setElectronics(data);
        } else if (itemType === "Fruits") {
          setFruits(data);
        } else if (itemType === "Vegetables") {
          setVegetables(data);
        } else if (itemType === "Bakery") {
          setBakery(data);
        } else if (itemType === "Pharmacy") {
          setPharmacy(data);
        }
      } else {
        console.log(`No items found for ${itemType}`);
      }
    } catch (error) {
      console.error(`Error fetching ${itemType} item details:`, error);
      // Handle error
    }
  };

  const makeOrder = async () => {
    try {
      const purchaseAmount = getTotalPrice();
      const response = await axios.post(
        "http://localhost:8070/Order/create-order",
        {
          customer_id: currentCustomer._id, // Pass the current customer's ID
          cart: cart, // Pass the cart details
          purchase_amount: purchaseAmount,
        }
      );
      console.log("Order created:", response.data);
      navigate(`/orders/${response.data._id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error
    }
  };

  // Function to add items to the cart
  const addToCart = (newItem) => {
    setCart([...cart, newItem]);
    console.log("Cart: ", cart);
  };

  // Function to remove item from the cart
  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item !== itemToRemove);
    setCart(updatedCart);
  };

  // Function to calculate total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderItems = (items) => {
    return (
      <div className="flex flex-wrap gap-5">
        {/* Render each itemGroup as a CardContainer */}
        {items.map((itemGroup, index) => (
          <div key={index} className="w-72">
            <CardContainer
              itemName={itemGroup.item_name}
              itemImage={itemGroup.item_img}
              description={itemGroup.description}
              items={itemGroup.items}
              cart={cart} // Pass down cart state
              addToCart={addToCart} // Pass down addToCart function
              getTotalPrice={getTotalPrice} // Pass down getTotalPrice function
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg">
      <PromotionContainer />

      <section className="routes" id="products">
        <div className="flex items-center justify-center">
          <Typography variant="h4" color="blue-gray" className="text-4xl mr-8">
            Shop Items
          </Typography>

          {currentCustomer && (
            <div>
              <Popover placement="bottom-start">
                <Badge content={`${cart.length}`}>
                  <PopoverHandler>
                    <IconButton>
                      <ShoppingCartIcon className="h-6 w-6" />
                    </IconButton>
                  </PopoverHandler>
                </Badge>
                <PopoverContent className="item-center justify-center">
                  <Typography
                    variant="body"
                    color="blue-gray"
                    className="text-left font-bold  text-xl pb-3 mb-1"
                  >
                    Your Cart
                  </Typography>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-5"
                    >
                      <div className="pr-10">
                        <Typography variant="body" color="blue-gray">
                          {item.name}:
                        </Typography>
                      </div>
                      <div className="flex-grow flex justify-center mr-4">
                        <Typography variant="body" color="blue-gray">
                          {item.price} x{" "}
                          {String(item.quantity).padStart(2, "0")}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="body"
                          color="blue-gray"
                          className="text-right mr-4"
                        >
                          = Rs.{" "}
                          {(item.price * item.quantity)
                            .toFixed(2)
                            .padStart(5, "0")}
                        </Typography>
                      </div>
                      <div>
                        <XMarkIcon
                          className="h-5 w-5 text-red-500"
                          onClick={() => removeFromCart(item)}
                        />
                      </div>
                    </div>
                  ))}

                  <div className=" flex items-center justify-between mt-2 px-9 py-2">
                    <Typography variant="body" color="blue-gray" className="font-semibold">
                      Total:
                    </Typography>
                    <Typography variant="body" color="blue-gray" className="font-semibold">
                      Rs. {getTotalPrice().toFixed(2).padStart(5, "0")}
                    </Typography>
                  </div>
                  <div className="gap-32 inline-flex border-t-2 pt-2 border-green-600">
                    <Button color="white" onClick={() => setCart([])} className="text-red-500 hover:text-red-700">
                      Clear Cart
                    </Button>
                    <Button color="green" onClick={makeOrder} className="border border-black">
                      Make Order
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {groceries.length > 0 && (
          <div>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-2xl pb-5 pt-10"
            >
              Groceries
            </Typography>
            {renderItems(groceries)}
          </div>
        )}

        {bakery.length > 0 && (
          <div>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-2xl pb-5 pt-10"
            >
              Bakery
            </Typography>
            {renderItems(bakery)}
          </div>
        )}

        {vegetables.length > 0 && (
          <div>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-2xl pb-5 pt-5"
            >
              Vegetables
            </Typography>

            {renderItems(vegetables)}
          </div>
        )}

        {fruits.length > 0 && (
          <div>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-2xl pb-5 pt-5"
            >
              Fruits
            </Typography>

            {renderItems(fruits)}
          </div>
        )}

        {pharmacy.length > 0 && (
          <div>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-2xl pb-5 pt-5"
            >
              Pharmacy
            </Typography>

            {renderItems(pharmacy)}
          </div>
        )}

        {electronics.length > 0 && (
          <div>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-2xl pb-5 pt-5"
            >
              Electronics
            </Typography>

            {renderItems(electronics)}
          </div>
        )}
      </section>
    </div>
  );
}
