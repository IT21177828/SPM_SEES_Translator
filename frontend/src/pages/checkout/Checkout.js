import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useError } from "../../context/checkoutContext";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  const validateCard = async () => {
    console.log(cardNumber.length);
    if (cardNumber.length != 19) {
      console.log("xxxxxxx");

      setCardError(false);
      setCardErrorMsg("Card number must be 16 digits");
      console.log("card number must be 16 digits");
    } else {
      setCardError(true);
      console.log(cardError);
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
      alert("Payment is not successfull");
      console.log("falsessss");
    }
  };

  //must check membership already activated or nots
  const handleSubmit = (e) => {
    e.preventDefault();
    validateCard().then((res) => {
      checkStatus().then((res) => {
        activatingMembership();

        generatePDF();
        
      });

      setCardData({
        cardNumber: "",
      });
    });
  };

  const generatePDF = () => {
    const input = document.getElementById('pdf-content'); // Replace 'pdf-content' with the ID of the element you want to capture
  
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width
      const pageHeight = 297; // A4 height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight; // Change this to let
  
      let position = 0;
  
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save('receipt.pdf');
    });
  };
  

  // const downloadPDF = () => {
  //   const doc = new jsPDF();
  //   const tableColumn = ["Membership Name", "price", "description"];
  //   const tableRows = [];

  //   membership.forEach((membership) => {
  //     const equipmentData = [
  //       membership.name,
  //       membership.price,
  //       membership.description,

  //     ];
  //     tableRows.push(equipmentData);
  //   });

  //   doc.autoTable(tableColumn, tableRows, { startY: 20 });
  //   doc.save("MembershipList.pdf");
  // };

  return (
    <div className="flex">
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Secure Checkout
                <span className="mt-2 block h-1 w-10 bg-blue-600 sm:w-20"></span>
              </h1>

              <form
                action=""
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className="mt-10 flex flex-col space-y-4"
              >
                <div>
                  <label
                    for="email"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={isLogedIn ? user.email : ""}
                    className="mt-1 text-black block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  ></input>
                </div>
                <div className="flex space-x-10">
                  <div className="">
                    <label
                      for="text"
                      className="text-xs font-semibold text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={isLogedIn ? user.firstName : ""}
                      className="mt-1 block text-black w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="">
                    <label
                      for="text"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={isLogedIn ? user.lastName : ""}
                      className="mt-1 block text-black w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label
                    for="card-number"
                    name="cardNumber"
                    value={cardData.cardNumber}
                    onChange={handleCardChange}
                    className="text-xs font-semibold text-gray-500"
                  >
                    Card number
                  </label>
                  {/* <input type="number" id="card-number" maxLength="16" name="card-number" placeholder="1234-5678-XXXX-XXXX" className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /> */}
                  {/* <input type="text" id="card-number" maxLength="19" name="card-number" placeholder="1234-5678-XXXX-XXXX" className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /> */}
                  <input
                    type="text"
                    maxLength="19"
                    id="card-number"
                    name="card-number"
                    placeholder="1234-5678-XXXX-XXXX"
                    value={cardNumber}
                    onChange={handleInputChange}
                    className="block w-full text-black rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  />

                  <img
                    src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                    alt=""
                    className="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    Expiration date
                  </p>
                  <div className="mr-6 flex flex-wrap">
                    <div className="my-1">
                      <label for="month" className="sr-only">
                        Select expiration month
                      </label>
                      <select
                        name="month"
                        id="month"
                        className="cursor-pointer text-black rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
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
                    <div className="my-1 ml-3 mr-6">
                      <label for="year" className="sr-only">
                        Select expiration year
                      </label>
                      <input
                        type="text"
                        maxLength="4"
                        id="security-code"
                        name="security-code"
                        placeholder="year"
                        className="block w-36 rounded text-black border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="relative my-1">
                      <label for="security-code" className="sr-only">
                        Security code
                      </label>
                      <input
                        type="text"
                        maxLength="3"
                        id="security-code"
                        name="security-code"
                        placeholder="cvv"
                        className="block w-36 rounded text-black border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label for="card-name" className="sr-only">
                    Card name
                  </label>
                  <input
                    type="text"
                    id="card-name"
                    name="card-name"
                    placeholder="Name on the card"
                    className="mt-1 block w-full rounded text-black border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <p className="mt-10 text-center text-sm font-semibold text-gray-500">
                  By placing this order you agree to the{" "}
                  <a
                    href="#"
                    className="whitespace-nowrap text-blue-400 underline hover:text-blue-600"
                  >
                    Terms and Conditions
                  </a>
                </p>
                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center rounded bg-blue-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-white-500 sm:text-lg"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
          <div id="pdf-content" className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <img
                src="https://blog.contactpigeon.com/wp-content/uploads/2020/08/Mobile-Checkout-Best-Practices.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-blue-900 to-blue-400 opacity-95"></div>
            </div>
            <div className="relative">
              <ul className="space-y-5">
                <li className="flex justify-between">
                  <div className="inline-flex">
                    <img
                      src="https://www.mageworx.com/blog/wp-content/uploads/2022/05/600x315_4-Step-Conclusive-Guide-to-Secure-Checkout-in-2022.png"
                      alt=""
                      className="max-h-16"
                    />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">
                        {form.name}
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80">
                        {form.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">{form.price}$</p>
                </li>
              </ul>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>{form.price}$</span>
                </p>
                <p className="flex justify-between text-sm font-medium text-white">
                  <span>Vat: 10%</span>
                  <span>${form.price + form.price * (10 / 100)}</span>
                </p>
              </div>
            </div>
            <div className="relative mt-10 text-white">
              <h3 className="mb-5 text-lg font-bold">Support</h3>
              <p className="text-sm font-semibold">
                +01 653 235 211 <span className="font-light">(International)</span>
              </p>
              <p className="mt-1 text-sm font-semibold">
                support@seestranslator.com{" "}
                <span className="font-light">(Email)</span>
              </p>
              <p className="mt-2 text-xs font-medium">
                Call us now for payment related issues
              </p>
            </div>
            <div className="relative mt-10 flex">
              <p className="flex flex-col">
                <span className="text-sm font-bold text-white">
                  Money Back Guarantee
                </span>
                <span className="text-xs font-medium text-white">
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
