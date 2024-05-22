import { Customer } from "../models/customer.model.js";
import { Product } from "../models/product.model.js";
import { Transaction } from "../models/transaction.model.js";
import { faker } from "@faker-js/faker";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateData = asyncHandler(async (req, res) => {
  await Product.deleteMany({});
  await Customer.deleteMany({});
  await Transaction.deleteMany({});

  const products = [];
  const customers = [];

  for (let i = 0; i < 20; i++) {
    try {
      console.log(`Index : ${i + 1}`);
      const customer = new Customer({
        name: faker.internet.displayName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
      });
      customers.push(customer);
      await customer.save();
      const product = new Product({
        name: faker.commerce.productName(),
        price: faker.number.int({ min: 10, max: 100 }),
        category: faker.commerce.department(),
      });
      products.push(product);
      await product.save();
    } catch (error) {
      console.log("Error : ", error);
    }
  }
  for (let i = 0; i < 50; i++) {
    const randomNumber = Math.floor(Math.random() * 20);
    const transaction = new Transaction({
      productId:
        // products[faker.datatype.number({ min: 0, max: products.length - 1 })]
        products[randomNumber]._id,
      customerId:
        // customers[faker.datatype.number({ min: 0, max: customers.length - 1 })]
        customers[randomNumber]._id,
      amount: faker.number.int({ min: 10, max: 100 }),
      // paymentMethod: faker.finance.transactionType(),
      paymentMethod: faker.helpers.arrayElement([
        "Cash",
        "Credit Card",
        "PayPal",
      ]),

      // date: faker.date.past(),
    });
    await transaction.save();
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product and Customer Data generated"));
});

export { generateData };
