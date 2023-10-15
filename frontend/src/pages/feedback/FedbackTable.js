import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

const FeedbackTable = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [updatedFeedback, setUpdatedFeedback] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProcessingUpdate, setIsProcessingUpdate] = useState(false);
  const [user, setUser] = useState({ _id: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (!user._id) {
      fetchUserData();
    } else {
      getData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post("http://localhost:5050/user/details", null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (res.data.user) {
        setUser(res.data.user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getData = async () => {
    const token = localStorage.getItem("accessToken");
    const userId = user._id;
    const url = `http://localhost:5050/feedback/user?userId=${userId}`;
    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setFeedbackData(data.data);
      })
      .catch((error) => console.error("Error fetching feedback data:", error));
  };

  const handleDelete = (id) => {
    setIsDeleteModalOpen(true);
    setSelectedFeedback(id);
  };

  const confirmDelete = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .delete(`http://localhost:5050/feedback/delete/${selectedFeedback}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFeedbackData((prevData) =>
          prevData.filter((feedback) => feedback._id !== selectedFeedback)
        );
        setIsDeleteModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (feedback) => {
    setSelectedFeedback(feedback);
    setUpdatedFeedback(feedback.feedbackText);
    setCharacterCount(feedback.feedbackText.length); // Set character count
    setIsUpdateModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFeedback(null);
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const updateFeedback = () => {
    setIsProcessingUpdate(true);
    const token = localStorage.getItem("accessToken");
    axios
      .put(
        `http://localhost:5050/feedback/update/${selectedFeedback._id}`,
        {
          feedbackText: updatedFeedback,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setFeedbackData((prevData) =>
          prevData.map((feedback) =>
            feedback._id === selectedFeedback._id
              ? { ...feedback, feedbackText: updatedFeedback }
              : feedback
          )
        );
        setIsProcessingUpdate(false);
        closeModal();
      })
      .catch((error) => {
        setIsProcessingUpdate(false);
        console.error("Error updating feedback:", error);
      });
  };

  const generateFeedbackReport = () => {
    const doc = new jsPDF();
    const tableColumn = ["Input Language", "Output Language", "Feedback Text"];
    const tableRows = [];

    feedbackData.forEach((feedback) => {
      const rowData = [
        feedback.word || "N/A",
        feedback.sword || "N/A",
        feedback.feedbackText || "N/A",
      ];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("Feedback_Report.pdf");
  };

  return (
    <div className="feedback-table mt-4">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">Input Language</th>
            <th className="px-4 py-2">Output Language</th>
            <th className="px-4 py-2">Feedback Text</th>
            <th className="px-4 py-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback) => (
            <tr key={feedback._id} className="border-t">
              <td className="px-4 py-2">{feedback.word}</td>
              <td className="px-4 py-2">{feedback.sword}</td>
              <td className="px-4 py-2">{feedback.feedbackText}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleUpdate(feedback)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover.bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDelete(feedback._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">
              <br />
              <div className="flex justify-center">
                <button
                  onClick={generateFeedbackReport}
                  className="bg-black hover:bg-black-700 text-white font-bold py-4 px-4 rounded flex items-center space-x-2"
                >
                  <svg
                    className="animate-bounce w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    ></path>
                  </svg>
                  Generate Feedback Report
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {isUpdateModalOpen && selectedFeedback && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal bg-white rounded shadow-md p-6 w-96">
            <span
              className="close text-gray-600 text-2xl absolute top-0 right-0 mr-4 mt-2 cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <center>
              <h2 className="text-xl font-semibold mb-4">Update Feedback</h2>
            </center>
            <textarea
              className="w-full border rounded p-2 mb-4"
              value={updatedFeedback}
              onChange={(e) => {
                const newText = e.target.value;
                const charCount = newText.length;
                if (charCount <= 50) {
                  setUpdatedFeedback(newText);
                  setCharacterCount(charCount); // Update character count
                }
              }}
              rows="4"
              placeholder="Enter updated feedback"
            />
            <p className="text-gray-500 text-right">
              {characterCount} / 50 characters
            </p>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={updateFeedback}
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
                  "Update Feedback"
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

      {isDeleteModalOpen && selectedFeedback && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal bg-white rounded shadow-md p-6 w-96">
            <span
              className="close text-gray-600 text-2xl absolute top-0 right-0 mr-4 mt-2 cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <center>
              <h2 className="text-xl font-semibold mb-4">Delete Feedback</h2>
            </center>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this feedback? This action
                cannot be undone.
              </p>
            </div>
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
  );
};

export default FeedbackTable;
