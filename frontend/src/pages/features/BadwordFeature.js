import axios from "axios";
import React, { useEffect, useState } from "react";

const user = "Suppa";

export default function BadwordFeature() {
  const [postDetails, setPostDetails] = useState([]);

  async function getDetails() {
    const id = { user };

    const posts = await axios.get("http://localhost:5050/bad/badpost", {
      params: id,
    });
    console.log(posts.data.response);
    setPostDetails(posts.data.response);
  }

  useEffect(() => {
    getDetails();
  }, []);

  function getDate(date) {
    const dateTime = new Date(date);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; 
    const day = dateTime.getDate();
    const hour = dateTime.getUTCHours();
    const minute = dateTime.getUTCMinutes();
    const second = dateTime.getUTCSeconds();
    const millisecond = dateTime.getUTCMilliseconds();

    const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    console.log(formattedDateTime);
    return formattedDateTime;
  }
  return (
    <div>
      <h2 class="px-5 text-lg font-medium text-gray-800 dark:text-white">
        Bad Words
      </h2>

      <div class="mt-8 space-y-4">

      <div>
      <div className="w-full rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        {postDetails.map((item) => {
          return (
            <div>
              <a
                href="#"
                className="block w-full cursor-pointer border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
              >
                <div className="text-red-600">{item.badPhase}</div>
                <br />
                {getDate(item.createdAt)}
              </a>
            </div>
          );
        })}
      </div>
    </div>

{/* 


        <button class="flex w-full items-center gap-x-2 px-5 py-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800">
          <div class="text-left rtl:text-right">
            <h1 class="text-sm font-medium capitalize text-gray-700 dark:text-white">
              Mia John
            </h1>

            <p class="text-xs text-gray-500 dark:text-gray-400">
              11.2 Followers
            </p>
          </div>
        </button>

        <button class="flex w-full items-center gap-x-2 px-5 py-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800">
          <div class="relative">
            <img
              class="h-8 w-8 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1608174386344-80898cec6beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&h=687&q=80"
              alt=""
            />
            <span class="absolute bottom-0 right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
          </div>

          <div class="text-left rtl:text-right">
            <h1 class="text-sm font-medium capitalize text-gray-700 dark:text-white">
              Junior REIS
            </h1>

            <p class="text-xs text-gray-500 dark:text-gray-400">
              56.6 Followers
            </p>
          </div>
        </button> */}
      </div>
    </div>
  );
}
