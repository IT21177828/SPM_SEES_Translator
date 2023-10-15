import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useError } from "../../context/checkoutContext";

export default function Checkout() {
  // Get the object ID from the URL using useParams

  const [cardError, setCardError] = useState(false);
  const [cardErrorMsg, setCardErrorMsg] = useState("");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expireDate: "",
    expireMonth: "",
    cvv: "",
    nameOnCard: "",
  });

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    duration: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  //get membership type details
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5050/membershipType/view/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        // navigate("/");
        // return;
      }
      setForm(record);
    }
    fetchData();
    fetchUserData();
    return;
  }, [params.id, navigate]);

  const [memebrShipCurrentStatus, setStatus] = useState({});
  const [user, setUser] = useState({});
  const [isLogedIn, setIsLogedIn] = useState(false); // Updated state
  const [cardNumber, setCardNumber] = useState("");

  // Handle the input change event for the card number field
  const handleInputChange = (e) => {
    // Remove any characters that are not digits or hyphens
    const sanitizedValue = e.target.value.replace(/[^0-9-]/g, "");
    setCardNumber(sanitizedValue);
  };

  // fetch membership data using user email
  const fetchMembershipData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5050/membership/getMembershipDetails",
        {
          email: user.email,
        }
      );
      console.log(response);
      navigate("#");
    } catch (error) {
      console.err("Error fetching user data:", error);
    }
  };

  // Fetch user data from the server
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios
        .post("http://localhost:5050/user/details", null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
            setIsLogedIn(true);
          } else {
            setIsLogedIn(false);
          }
        })
        .catch((err) => {
          console.log(err.response?.data);
        });
    } catch (error) {
      console.err("Error fetching user data:", error);
    }
  };

  //validate card details


  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value,
    });
  };
  // console.log(user.email);

  const checkStatus = async (e) => {
    let data = user.email;

    try {
      // let email = user.email;
      // console.log(email);  //console print email correctly
      const response = await axios
        .post("http://localhost:5050/membership/getMembershipDetails", {
          //xhr.js:251     POST http://localhost:5050/membership/getMembershipDetails 400 (Bad Request)
          email: data,
        })
        .then((res) => {
          // console.log(res.data.user.firstName);
          const memebrShipStatus = res.data;
          console.log(memebrShipStatus);
          console.log(memebrShipStatus.status);
          setStatus(memebrShipStatus.status);
        })
        .catch((err) => {
          console.log(err.response?.data);
        });
    } catch (error) {
      console.log(error);
      console.log("bbbbbb");
    }
  };

  // console.log(memebrShipStatus);

  const validateCard =  async () => {

    console.log(cardNumber.length);
    if (cardNumber.length != 19) {
      console.log("xxxxxxx");

      setCardError(false);
      setCardErrorMsg("Card number must be 16 digits");
      console.log("card number must be 16 digits");
    } else {
      setCardError(true);
      console.log(cardError)
      setCardErrorMsg("Approved payment");
      console.log("zzzzzzzaz");
    }
  };

  const activatingMembership = async (e) => {
    
    console.log("fffffff");
    console.log(cardError);

    if (cardError) {
      if (memebrShipCurrentStatus === "active") {
        alert("Membership already activated");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:5050/membership/",
            {
              email: user.email,
              name: form.name,
              payment: "approved",
            }
          );
          console.log(response);
          alert("Payment is successfull");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      // alert("Payment is not successfull");
      console.log("falsessss")
    }
  };

  //must check membership already activated or nots
  const handleSubmit= (e) => {
    e.preventDefault();
    validateCard().then((res) => {
      checkStatus().then((res) => {
        activatingMembership();
      });
  
      setCardData({
        cardNumber: "",
      });

    })
    


  };

  return (
    <div className="flex">
      <div class="relative mx-auto w-full bg-white">
        <div class="grid min-h-screen grid-cols-10">
          <div class="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div class="mx-auto w-full max-w-lg">
              <h1 class="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Secure Checkout
                <span class="mt-2 block h-1 w-10 bg-blue-600 sm:w-20"></span>
              </h1>

              <form
                action=""
                onSubmit={(e) =>{
                  handleSubmit(e);
                }}
                class="mt-10 flex flex-col space-y-4"
              >
                <div>
                  <label
                    for="email"
                    class="text-xs font-semibold text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={isLogedIn ? user.email : ""}
                    class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  ></input>
                </div>
                <div className="flex space-x-10">
                  <div className="">
                    <label
                      for="text"
                      class="text-xs font-semibold text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={isLogedIn ? user.firstName : ""}
                      class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="">
                    <label
                      for="text"
                      class="text-xs font-semibold text-gray-500"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={isLogedIn ? user.lastName : ""}
                      class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div class="relative">
                  <label
                    for="card-number"
                    name="cardNumber"
                    value={cardData.cardNumber}
                    onChange={handleCardChange}
                    class="text-xs font-semibold text-gray-500"
                  >
                    Card number
                  </label>
                  {/* <input type="number" id="card-number" maxlength="16" name="card-number" placeholder="1234-5678-XXXX-XXXX" class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /> */}
                  {/* <input type="text" id="card-number" maxlength="19" name="card-number" placeholder="1234-5678-XXXX-XXXX" class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /> */}
                  <input
                    type="text"
                    maxlength="19"
                    id="card-number"
                    name="card-number"
                    placeholder="1234-5678-XXXX-XXXX"
                    value={cardNumber}
                    onChange={handleInputChange}
                    className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  />

                  <img
                    src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                    alt=""
                    class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div>
                  <p class="text-xs font-semibold text-gray-500">
                    Expiration date
                  </p>
                  <div class="mr-6 flex flex-wrap">
                    <div class="my-1">
                      <label for="month" class="sr-only">
                        Select expiration month
                      </label>
                      <select
                        name="month"
                        id="month"
                        class="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">01</option>
                        <option value="">02</option>
                        <option value="">03</option>
                        <option value="">04</option>
                        <option value="">05</option>
                        <option value="">06</option>
                        <option value="">07</option>
                        <option value="">08</option>
                        <option value="">09</option>
                        <option value="">09</option>
                        <option value="">10</option>
                        <option value="">11</option>
                        <option value="">12</option>
                      </select>
                    </div>
                    <div class="my-1 ml-3 mr-6">
                      <label for="year" class="sr-only">
                        Select expiration year
                      </label>
                      <input
                        maxlength="4"
                        type="number"
                        name="year"
                        id="year"
                        class="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      ></input>
                    </div>
                    <div class="relative my-1">
                      <label for="security-code" class="sr-only">
                        Security code
                      </label>
                      <input
                        type="text"
                        id="security-code"
                        name="security-code"
                        placeholder="cvv"
                        class="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label for="card-name" class="sr-only">
                    Card name
                  </label>
                  <input
                    type="text"
                    id="card-name"
                    name="card-name"
                    placeholder="Name on the card"
                    class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <p class="mt-10 text-center text-sm font-semibold text-gray-500">
                  By placing this order you agree to the{" "}
                  <a
                    href="#"
                    class="whitespace-nowrap text-blue-400 underline hover:text-blue-600"
                  >
                    Terms and Conditions
                  </a>
                </p>
                <button
                  type="submit"
                  class="mt-4 inline-flex w-full items-center justify-center rounded bg-blue-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-white-500 sm:text-lg"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
          <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 class="sr-only">Order summary</h2>
            <div>
              <img
                src="https://blog.contactpigeon.com/wp-content/uploads/2020/08/Mobile-Checkout-Best-Practices.png"
                alt=""
                class="absolute inset-0 h-full w-full object-cover"
              />
              <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-blue-900 to-blue-400 opacity-95"></div>
            </div>
            <div class="relative">
              <ul class="space-y-5">
                <li class="flex justify-between">
                  <div class="inline-flex">
                    <img
                      src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhhaXIlMjBkcnllcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      alt=""
                      class="max-h-16"
                    />
                    <div class="ml-3">
                      <p class="text-base font-semibold text-white">
                        {form.name}
                      </p>
                      <p class="text-sm font-medium text-white text-opacity-80">
                        {form.description}
                      </p>
                    </div>
                  </div>
                  <p class="text-sm font-semibold text-white">{form.price}$</p>
                </li>
              </ul>
              <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div class="space-y-2">
                <p class="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>{form.price}$</span>
                </p>
                <p class="flex justify-between text-sm font-medium text-white">
                  <span>Vat: 10%</span>
                  <span>${form.price + form.price * (10 / 100)}</span>
                </p>
              </div>
            </div>
            <div class="relative mt-10 text-white">
              <h3 class="mb-5 text-lg font-bold">Support</h3>
              <p class="text-sm font-semibold">
                +01 653 235 211 <span class="font-light">(International)</span>
              </p>
              <p class="mt-1 text-sm font-semibold">
                support@seestranslator.com{" "}
                <span class="font-light">(Email)</span>
              </p>
              <p class="mt-2 text-xs font-medium">
                Call us now for payment related issues
              </p>
            </div>
            <div class="relative mt-10 flex">
              <p class="flex flex-col">
                <span class="text-sm font-bold text-white">
                  Money Back Guarantee
                </span>
                <span class="text-xs font-medium text-white">
                  within 30 days of purchase
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
