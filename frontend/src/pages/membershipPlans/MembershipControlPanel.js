import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

export default function MembershipControlPanel() {

    const navigate = useNavigate();
  const [membership, setMembership, deleteMemebership] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/membershipType/view")
      .then((result) => setMembership(result.data))
      .catch((err) => console.log(err));
  }, []);


  const handleDelete = (id) => {
    axios
      .delete('http://localhost:5050/membershipType/delete/' + id)
      .then(res => {
        console.log(res);
        // Remove the deleted item from the local state
        // SetHistory(prevHistory => prevHistory.filter(item => item._id !== id));
        window.location.reload();
      })
      .catch(err => console.log(err));
    };

    




  return (
    <div>
      <div>
        <div className="min-h-screen bg-gray-100 overflow-auto">
          <div className="container mx-auto max-w-4xl">
            <div className="mt-10 text-center">
              <h1 className="text-4xl font-bold text-gray-800">Member Ship Plans</h1>
            </div>

            <hr className="mt-10" />

            <div className="mt-10">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900">
                      Plan Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {membership.map((plan, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover object-center"
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div> */}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {plan.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                          ${plan.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {plan.description}
                      </td>
                      <td class="px-6 py-4">
          <div class="flex justify-end gap-4">
            <a x-data="{ tooltip: 'Delete' }" href="#">
                
              <svg
                // onClick={(e) => handleDelete(membership._id)}
                onClick={(e) => {
                    e.preventDefault();
                    handleDelete(plan._id);}}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </a>
            <a x-data="{ tooltip: 'Edite' }" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </a>
          </div>
        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
