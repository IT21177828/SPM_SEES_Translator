import axios from "axios";
import React, { useEffect, useState } from "react";
const user = "Suppa";
export default function BadWordHistory() {
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
  );
}
