import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { Link, useParams } from "react-router-dom";
import "jspdf-autotable";

export default function ControlPanel() {
  const [membership, SetMembership] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackData, setMemberShipData] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const [updatedMembershipsName, setUpdatedMembershipname] = useState([]);
  const [updatedMembershipsPrice, setUpdatedMembershipprice] = useState([]);
  const [updatedMembershipsDescription, setUpdatedMembershipsDescription] =
    useState([]);

  const [updatedMembership, setUpdatedMemberShip] = useState([]);
  const [isProcessingUpdate, setIsProcessingUpdate] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5050/membershipType/view")
      .then((result) => SetMembership(result.data))
      .catch((err) => console.log(err));
  }, []);

  const closeModal = () => {
    setSelectedMembership(null);
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { id } = useParams();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5050/membershipType/view/${id}`
  //       );
  //       setFormData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Send a POST request to your API to add the new membership plan
  //   axios
  //     .post("http://localhost:5050/membershipType/", formData)
  //     .then((result) => {
  //       // Update the state or perform any other necessary actions
  //       setMemberships([...memberships, result.data]);
  //       // Clear the form data
  //       setFormData({
  //         name: "",
  //         price: 0,
  //         description: "",
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };

  //   fetchData(); // Call the fetchData function to trigger the data fetching.

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  const handleUpdate = (plan) => {
    setSelectedMembership(plan);
    setUpdatedMembershipname(plan.name);
    setUpdatedMembershipprice(plan.price);
    setUpdatedMembershipsDescription(plan.description);

    // setCharacterCount(feedback.feedbackText.length); // Set character count
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id) => {
    setIsDeleteModalOpen(true);
    setSelectedMembership(id);
  };

  const UpdateMemberShip = () => {
    setIsProcessingUpdate(true);

    axios
      .put(
        `http://localhost:5050/membershipType/update/${selectedMembership._id}`,
        {
          name: updatedMembershipsName,
          price: updatedMembershipsPrice,
          description: updatedMembershipsDescription,
        }
      )
      .then(() => {
        setMemberShipData((prevData) =>
          prevData.map((plan) =>
            plan._id === selectedMembership._id
              ? {
                  ...plan,
                  name: updatedMembershipsName,
                  price: updatedMembershipsPrice,
                  description: updatedMembershipsDescription,
                }
              : plan
          )
        );
        setIsProcessingUpdate(false);
        closeModal();
        window.location.reload();
      })
      .catch((error) => {
        setIsProcessingUpdate(false);
        console.error("Error updating feedback:", error);
      });
  };

  const confirmDelete = () => {
    console.log(selectedMembership);
    axios
      .delete(
        `http://localhost:5050/membershipType/delete/${selectedMembership}`,
        {}
      )
      .then(() => {
        // Handle the successful delete here
        setIsDeleteModalOpen(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // const handleUpdate = (id) => {
  //   window.location.href = "update-member/"+id;
  // };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Membership Name", "price", "description"];
    const tableRows = [];

    membership.forEach((membership) => {
      const equipmentData = [
        membership.name,
        membership.price,
        membership.description,
      ];
      tableRows.push(equipmentData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("MembershipList.pdf");
  };

  // fucntion for search using membership name
  const filteredMembership = membership.filter((plan) => {
    return plan.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="flex h-screen">
        <div className="px-4 py-2 bg-gray-200 bg-indigo-600 lg:w-1/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-8 h-8 text-white lg:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <div className="hidden lg:block">
          <div className="my-2 mb-6">
  <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
</div>


            <ul>
              <li className="mb-6">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    name="search"
                    className="w-full px-4 py-2 pl-12 rounded shadow outline-none"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </li>
              <li className="mb-2 rounded bg-gray-800 hover:shadow hover:bg-gray-800">
                <a
                  href="#"
                  className="inline-block w-full h-full px-3 py-2 font-bold text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-6 h-6 mr-2 -mt-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </a>
              </li>
              {/* <li className="mb-2 bg-gray-800 rounded shadow">
                <a
                  href="#"
                  className="inline-block w-full h-full px-3 py-2 font-bold text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-6 h-6 mr-2 -mt-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Blogs
                </a>
              </li> */}
              {/* <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
                <a
                  href="#"
                  className="inline-block w-full h-full px-3 py-2 font-bold text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-6 h-6 mr-2 -mt-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Reports
                </a>
              </li> */}
              {/* <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
                <a
                  href="#"
                  className="inline-block w-full h-full px-3 py-2 font-bold text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-6 h-6 mr-2 -mt-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Inbox
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
          <div className="container mx-auto mt-12">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
                <div className="p-3 bg-indigo-600 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="mx-4">
                  <button>
                    <Link to="/create-membership">
                      <h4 className="text-2xl font-semibold text-gray-700">
                        Add New Membership
                      </h4>
                      {/* <div className="text-gray-500">All Users</div> */}
                    </Link>
                  </button>
                </div>
              </div>
              <div className="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
                <div className="p-3 bg-indigo-600 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7h4m0 0l-4 4m4-4l4 4m7 5H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="mx-4">
                  <button onClick={() => downloadPDF()} className="hov">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      Download Report
                    </h4>
                    {/* <div className="text-gray-500">All Blogs</div> */}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Price
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Description
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Status
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Edit
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Delete
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {filteredMembership.map((plan, index) => (
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
                          <td
                            className="px-6 py-4 whitespace-nowrap"
                            style={{ maxWidth: "200px", whiteSpace: "normal" }}
                          >
                            {plan.description}
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                              Active
                            </span>
                          </td>

                          <td
                            id=""
                            className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200"
                          >
                            <svg
                              onClick={() => {
                                handleUpdate(plan);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <svg
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(plan._id);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-red-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* //update model  */}

                  {isUpdateModalOpen && selectedMembership && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="modal bg-gray-100 rounded shadow-md p-6 w-96">
                        <span
                          className="close text-gray-600 text-2xl absolute top-0 right-0 mr-4 mt-2 cursor-pointer"
                          onClick={closeModal}
                        >
                          &times;
                        </span>
                        <center>
                          <h2 className="text-xl font-semibold mb-4">
                            Update Membership
                          </h2>
                        </center>

                        <div className="mb-6">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="price"
                            name="price"
                            value={updatedMembershipsName}
                            onChange={(e) => {
                              const newText = e.target.value;
                              setUpdatedMembershipname(newText); // Correct the variable name here
                              // Update character count if needed
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Price"
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            value={updatedMembershipsPrice}
                            onChange={(e) => {
                              const newText = e.target.value;
                              setUpdatedMembershipprice(newText); // Correct the variable name here
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Price"
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                          >
                            Description
                          </label>
                          <textarea
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={updatedMembershipsDescription}
                            onChange={(e) => {
                              const newText = e.target.value;
                              setUpdatedMembershipsDescription(newText);
                            }}
                            rows={4} // Specify the number of rows you want
                            placeholder="Enter updated feedback"
                          />
                        </div>

                        {/* <textarea
                          className="w-full border rounded p-2 mb-4"
                          value={updatedMembershipsName}
                          onChange={(e) => {
                            const newText = e.target.value;
                            setUpdatedMembershipname(newText); // Correct the variable name here
                            // Update character count if needed
                          }}
                          rows="4"
                          placeholder="Enter updated feedback"
                        />

                        <textarea
                          className="w-full border rounded p-2 mb-4"
                          value={updatedMembershipsPrice}
                          onChange={(e) => {
                            const newText = e.target.value;
                            setUpdatedMembershipprice(newText); // Correct the variable name here
                          }}
                          rows="4"
                          placeholder="Enter updated feedback"
                        />
                        <textarea
                          className="w-full border rounded p-2 mb-4"
                          value={updatedMembershipsDescription}
                          onChange={(e) => {
                            const newText = e.target.value;

                            setUpdatedMembershipsDescription(newText); // Correct the variable name here
                          }}
                          rows="4"
                          placeholder="Enter updated feedback"
                        /> */}

                        {/* <p className="text-gray-500 text-right">
                          {characterCount} / 50 characters
                        </p> */}
                        <div className="flex justify-end">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={UpdateMemberShip}
                            disabled={isProcessingUpdate}
                          >
                            {isProcessingUpdate ? (
                              <div className="flex items-center">
                                <svg
                                  className="animate-spin h-5 w-5 mr-3 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                    fill="none"
                                  />
                                </svg>
                                Updating...
                              </div>
                            ) : (
                              "Update Membership"
                            )}
                          </button>
                          <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* //delete model  */}
                  {isDeleteModalOpen && selectedMembership && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="modal bg-gray-100 rounded shadow-md p-6 w-96">
                        <span
                          className="close text-gray-600 text-2xl absolute top-0 right-0 mr-4 mt-2 cursor-pointer"
                          onClick={closeModal}
                        >
                          &times;
                        </span>
                        <center>
                          <h2 className="text-xl font-semibold mb-4">
                            Delete Membership
                          </h2>
                        </center>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this Membership?
                            This action cannot be undone.
                          </p>
                        </div>
                        <br></br>
                        <div className="flex justify-end">
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={confirmDelete}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
