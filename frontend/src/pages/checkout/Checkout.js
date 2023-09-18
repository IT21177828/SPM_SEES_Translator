import React from "react";
import { useState } from "react";
import axios from "axios";
import { useError } from "../../context/checkoutContext";
export const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const { error, setErrorMsg, clearError } = useError();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email) {
        setErrorMsg("Email is required");
        return;
      }

      clearError();

      const response = await axios.post(
        "http://localhost:5050/checkout/saveCheckout",
        formData
      );

      console.log("Response:", response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        setErrorMsg(errorMessage);

        console.error("Backend Error:", errorMessage);
      } else {
        setErrorMsg("An error occurred during checkout");

        console.error("Generic Error: An error occurred during checkout");
      }
    }
  };

  return (
    <div className="flex">
      <div className="bg-white text-center p-14 mr-2 rounded-lg ">
        <h1 className="font-bold text-lg" style={{ fontSize: "2rem" }}>
          Summery
        </h1>
        <div className="mt-44">
          <h1 className="font-bold">Platinum Plan</h1>
          <h1 className="font-bold">Price: $100</h1>
          <h1 className="font-bold">Duration: 1 year</h1>
        </div>
      </div>

      <div className="bg-white p-10 rounded-lg ">
        <form onSubmit={handleSubmit}>
          {/* Display error message */}

          {error && (
            <div className="text-red-500 text-center bg-red-100 p-2 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name">Name:</label>
            <input
              className="p-2 rounded-lg"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="p-2 rounded-lg"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              className="p-2 rounded-lg"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cardNumber">Credit Card Number:</label>
            <input
              className="p-2 rounded-lg"
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              className="p-2 rounded-lg"
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              className="p-2 rounded-lg"
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-1 px-2 rounded-lg h-10 mt-4 w-full"
          >
            CheckOut
          </button>
        </form>
      </div>
    </div>
  );
};
