import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getAllproduct = asyncHandler(async (req, res) => {
  const productData = await Product.find();
  return res
    .status(200)
    .json(new ApiResponse(200, productData, "Products Data"));
});
