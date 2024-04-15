import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardContainer } from "../components/CardContainer";
import { PromotionContainer } from "../components/home/PromotionContainer";
import { Typography } from "@material-tailwind/react";

export default function HomeUnregistered() {
  const [groceries, setGroceries] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);
  const [bakery, setBakery] = useState([]);

  useEffect(() => {
    // Fetch item details when the component mounts
    fetchItemDetails("Groceries");
    fetchItemDetails("Electronics");
  }, []);

  const fetchItemDetails = async (itemType) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/Items/item-details/${itemType}`
      );
      const data = response.data;
      console.log("Item:", response.data);

      // Check if data is not empty
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

  const renderItems = (items) => {
    return (
      <div className="flex flex-wrap  gap-5 ">
        {/* Render each item's details */}
        {items.map((item, index) => (
          <div key={index} className="w-72 ">
            <CardContainer
              supermarket={item.supermarket}
              itemName={item.itemName}
              price={item.price}
              availableQuantity={item.availableQuantity}
              description={item.description}
              itemImage={item.itemImage}
              itemID={item.itemID}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg">
      <PromotionContainer />
      <section className="routes" id="reservations">
        <Typography
          variant="h4"
          color="blue-gray"
          className="text-center text-4xl "
        >
          Shop Items
        </Typography>

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
