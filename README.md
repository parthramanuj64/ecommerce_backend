# E-commerce Dashboard Backend

This is the backend for the E-commerce Dashboard application built with Express and Node.js. This application provides API endpoints for managing customers, products, transactions, and payments using Stripe.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/get-npm) (version 6.x or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Stripe Account](https://stripe.com/)

### Installation

1. **Clone the repository:**

   ```sh
   https://github.com/parthramanuj64/ecommerce_backend.git
   cd ecommerce_backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory of the project.
   - Copy the content from `env.sample` and paste it into your `.env` file.
   - Set the environment variables as per your configuration.

   ```env
   PORT=8000
   MONGODB_URL=your_mongodb_url
   CORS_ORIGIN=http://localhost:5173
   DB_NAME=your_db_name
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Configure MongoDB:**

   - Ensure your MongoDB server is running.
   - Add your MongoDB connection URL to the `MONGODB_URL` variable in the `.env` file.

5. **Set up Stripe:**

   - Log in to your Stripe account and retrieve your secret key.
   - Add your Stripe secret key to the `STRIPE_SECRET_KEY` variable in the `.env` file.

### Running the Application

1. **Start the server:**

   ```sh
   npm run dev
   ```

2. **Server will start on the port specified in the `.env` file (default is 3000).**

### API Endpoints

The API provides the following endpoints:

- **Authentication:**

  - `POST /register` - Create new Account
  - `POST /login` - Verify Account
  - `POST /logout` - Logout from the Account

- **Customers:**

  - `GET /customers` - Get all customers

- **Products:**

  - `GET /products` - Get all products

- **Transactions:**

  - `GET /transactions` - Get all transactions

- **Payments:**
  - `POST /payment-links` - Create a new Stripe payment link
