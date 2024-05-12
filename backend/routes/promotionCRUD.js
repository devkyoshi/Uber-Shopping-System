//CRUD Tested
const express = require("express");
const router = express.Router();
const Supermarket = require("../models/supermarkets");

// Add promotion to a specific supermarket
router.post("/:supermarketId/promotion-add", async (req, res) => {
  try {
    const { supermarketId } = req.params;
    const { promotion_name, discount_rate, start_date, end_date, Items } =
      req.body;

    const supermarket = await Supermarket.findById(supermarketId);
    if (!supermarket) {
      return res.status(404).json({ error: "Supermarket not found" });
    }

    const newPromotion = {
      promotion_name,
      discount_rate,
      start_date,
      end_date,
      Items: Array.isArray(Items)
        ? Items.map((item) => ({ item_type: item.item_type }))
        : [],
    };

    supermarket.promotions.push(newPromotion);

    await supermarket.save();

    res.json("Promotion added to supermarket");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "An error occurred while adding the promotion to the supermarket",
      });
  }
});

// Update a promotion for a specific supermarket
// Update promotion in a specific supermarket
router.put(
  "/:supermarketId/promotion-update/:promotionId",
  async (req, res) => {
    try {
      const { supermarketId, promotionId } = req.params;
      const { promotion_name, discount_rate, start_date, end_date, Items } =
        req.body;

      const supermarket = await Supermarket.findById(supermarketId);
      if (!supermarket) {
        return res.status(404).json({ error: "Supermarket not found" });
      }

      const promotionIndex = supermarket.promotions.findIndex(
        (promo) => promo._id == promotionId
      );
      if (promotionIndex === -1) {
        return res.status(404).json({ error: "Promotion not found" });
      }

      supermarket.promotions[promotionIndex].promotion_name = promotion_name;
      supermarket.promotions[promotionIndex].discount_rate = discount_rate;
      supermarket.promotions[promotionIndex].start_date = start_date;
      supermarket.promotions[promotionIndex].end_date = end_date;
      supermarket.promotions[promotionIndex].Items = Array.isArray(Items)
        ? Items.map((item) => ({ item_type: item.item_type }))
        : [];

      await supermarket.save();

      res.json("Promotion updated successfully");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error:
            "An error occurred while updating the promotion in the supermarket",
        });
    }
  }
);

// Delete a promotion from a specific supermarket
router.delete(
  "/:supermarketId/promotion-delete/:promotionId",
  async (req, res) => {
    try {
      const { supermarketId, promotionId } = req.params;

      const supermarket = await Supermarket.findById(supermarketId);
      if (!supermarket) {
        return res.status(404).json({ error: "Supermarket not found" });
      }

      supermarket.promotions = supermarket.promotions.filter(
        (promotion) => promotion._id.toString() !== promotionId
      );

      await supermarket.save();

      res.json("Promotion deleted successfully");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the promotion" });
    }
  }
);

// Read all promotions for a specific supermarket
router.get("/:supermarketId/promotions", async (req, res) => {
  try {
    const { supermarketId } = req.params;

    const supermarket = await Supermarket.findById(supermarketId).populate(
      "promotions"
    );
    if (!supermarket) {
      return res.status(404).json({ error: "Supermarket not found" });
    }

    res.json(supermarket.promotions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching promotions" });
  }
});

module.exports = router;
