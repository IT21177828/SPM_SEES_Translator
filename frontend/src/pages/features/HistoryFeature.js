// TranslationHistory.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import deletelogo from "../../assets/delete.svg";
import jsPDF from "jspdf";
import "jspdf-autotable";
const HistoryFeature = (userId) => {
  const [history, setHistory] = useState([]);
  const user = userId.userId;

  async function getDetails() {
    const id = { user };

    try {
      const posts = await axios
        .get("http://localhost:5050/history/getHistory", {
          params: id,
        })
        .then((response) => {
          setHistory(response.data.response);
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response?.data?.message);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const refreshInterval = 1000; // 10 seconds in milliseconds

    const fetchData = async () => {
      try {
        await getDetails();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data immediately when the component mounts

    const intervalId = setInterval(fetchData, refreshInterval); // Set up the interval

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  const handleDelete = (id) => {
    // Show a confirmation dialog
    const confirmation = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmation) {
      // User clicked "OK," proceed with the deletion
      axios
        .delete("http://localhost:5050/history/deleteHistory/" + id)
        .then((res) => {
          // Remove the deleted item from the local state
          setHistory((prevHistory) =>
            prevHistory.filter((item) => item._id !== id)
          );
        })
        .catch((err) => console.log(err));
    } else {
      // User clicked "Cancel," do nothing
      console.log("Deletion canceled.");
    }
  };

  const handleDeleteAll = () => {
    // Show a confirmation dialog
    const confirmation = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmation) {
      // User clicked "OK," proceed with the deletion
      axios
        .delete("http://localhost:5050/history/clearAllData")
        .then((res) => {
          // Remove all items from the local state
          setHistory([]);
        })
        .catch((err) => console.log(err));
    } else {
      // User clicked "Cancel," do nothing
      console.log("Deletion canceled.");
    }
  };
  const generateHistoryReport = () => {
    const doc = new jsPDF();
    doc.setFont("Sinhala");
    const tableColumn = [
      "Input Language",
      "Output Language",
      "Input Text",
      "Translated Text (Sinhala)", // Updated column name
    ];
    const tableRows = [];

    history.forEach((history) => {
      const rowData = [
        history.inputLanguage || "N/A",
        history.outputLanguage || "N/A",
        history.textToTranslate || "N/A",
        history.translatedText || "සිංහල අකුර", // Update this with the actual Sinhala word
      ];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("History_Report.pdf");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="px-5 text-lg font-medium text-black dark:text-white">
          Translation History
        </h2>
      </div>
      <button
        className="float-right mr-4 dark:text-white"
        onClick={handleDeleteAll}
      >
        Clear All
      </button>
      <div className="mt-8 space-y-4">
        <div>
          <ul className="list-none p-2 m-2">
            {history.map((item) => (
              <li key={item._id} className="translate-history-item pt-1">
                <div className="bg-blue-600 text-black p-2 flex justify-between items-center mb-2 rounded dark:text-white">
                  <h2 className="text-x1 opacity-70 dark:text-white">
                    {item.inputLanguage} <span>&rarr;</span>{" "}
                    {item.outputLanguage}
                  </h2>
                  <img
                    className="h-5 w-5 filter invert opacity-80"
                    src={deletelogo}
                    alt="Delete"
                    onClick={(e) => handleDelete(item._id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="original-text text-black opacity-50 dark:text-white">
                  <strong>Original Text:</strong> {item.textToTranslate}
                </div>
                <div className="translated-text text-black opacity-50 dark:text-white">
                  <strong>Translated Text:</strong> {item.translatedText}
                </div>
                <hr className="my-2 border-blue-500 mt-7 opacity-30" />{" "}
                {/* Separator line */}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="fixed bottom-0 left-30 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={generateHistoryReport}
      >
        Download PDF
      </button>
    </div>
  );
};

export default HistoryFeature;
