import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Transaction } from "../models/transaction.model.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getAlltransaction = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customerDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $unwind: "$customerDetails",
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          paymentMethod: 1,
          createdAt: 1,
          product: "$productDetails",
          customer: "$customerDetails",
        },
      },
    ]);
    console.log("Transaction :", transactions);
    res.status(200).json(new ApiResponse(200, transactions, "Customer Data"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const createPaymentLink = asyncHandler(async (req, res) => {
  const { amount, name } = req.body;

  const priceCreate = await stripe.prices.create({
    currency: "inr",
    unit_amount: amount * 100,
    // recurring: {
    //   interval: "month",
    // },
    product_data: {
      name: name,
    },
  });
  console.log("Price Product Data", priceCreate.id);
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: priceCreate.id,
        quantity: 1,
      },
    ],
  });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        paymentLink.url,
        "Payment Link generated Successfully"
      )
    );
});
