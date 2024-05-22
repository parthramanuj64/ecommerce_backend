import mongoose, { Schema, model } from "mongoose";

const transactionSchmea = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchmea);
