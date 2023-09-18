import axios from "axios";
import React, { useEffect, useState } from "react";

export default function BadwordFeature(userId) {
  const [postDetails, setPostDetails] = useState([]);

  const user = userId.userId;

  async function getDetails() {
    const id = { user };

    try {
      const posts = await axios
        .get("http://localhost:5050/bad/badpost", {
          params: id,
        })
        .then((response) => {
          setPostDetails(response.data.response);
        })
        .catch((err) => {
          console.log(err.response?.data?.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  function getDate(date) {
    const dateTime = new Date(date);
    // Convert UTC time to local time (Sri Lanka)
    const options = { timeZone: "Asia/Colombo" }; // Sri Lanka time zone

    const localTimeString = dateTime.toLocaleTimeString("en-US", options);
    const localDateString = dateTime.toLocaleDateString("en-US", {
      ...options,
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedDateTime = `${localDateString} at ${localTimeString}`;
    return formattedDateTime;
  }
  return (
    <div>
      <h2 className="px-5 text-lg font-medium text-white dark:text-white">
        Bad Words
      </h2>

      <div className="mt-8 space-y-4">
        <div>
          <div className="w-full rounded-lg bg-white text-sm font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
            {postDetails.map((item, idx) => {
              return (
                <div key={idx}>
                  <div
                    href="#"
                    className="block w-full cursor-pointer border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
                  >
                    <div className="font-sans text-base pb-2">Inappropriate term was detected :</div>
                    <div className="text-red-600 font-bold font-sans text-lg mb-7">
                      {item.badPhase}
                    </div>
                    <div className="text-right text-[11px] italic font-thin opacity-50">
                      {getDate(item.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 


        <button className="flex w-full items-center gap-x-2 px-5 py-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800">
          <div className="text-left rtl:text-right">
            <h1 className="text-sm font-medium capitalize text-gray-700 dark:text-white">
              Mia John
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              11.2 Followers
            </p>
          </div>
        </button>

        <button className="flex w-full items-center gap-x-2 px-5 py-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800">
          <div className="relative">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1608174386344-80898cec6beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&h=687&q=80"
              alt=""
            />
            <span className="absolute bottom-0 right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
          </div>

          <div className="text-left rtl:text-right">
            <h1 className="text-sm font-medium capitalize text-gray-700 dark:text-white">
              Junior REIS
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              56.6 Followers
            </p>
          </div>
        </button> */}
      </div>
    </div>
  );
}
