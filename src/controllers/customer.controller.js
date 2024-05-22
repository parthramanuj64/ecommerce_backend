import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Customer } from "../models/customer.model.js";

export const getAllcustomer = asyncHandler(async (req, res) => {
  const customerData = await Customer.find();
  return res
    .status(200)
    .json(new ApiResponse(200, customerData, "Customer Data"));
});
