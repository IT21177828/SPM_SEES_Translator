// FeedbackTable.js (React component)
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FeedbackTable = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Replace with your API call to retrieve feedback data
    // Example API call:
    axios.get('http://localhost:5050/feedback') // Update the API endpoint
      .then((data) => {
        setFeedbackData(data.data)
        console.log(data.data)
    })
      .catch((error) => console.error('Error fetching feedback data:', error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:5050/feedback/' + id)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));


  };
 

//   const handleUpdate = (id) => {
//     // Make an API request to update the feedback item
//     axios.put(`http://localhost:5050/feedback/${selectedFeedback.id}`, {
//       feedbackText: updatedFeedback,
//     }) // Update the API endpoint and payload as needed
//       .then(() => {
//         // Update the local state with the updated feedback text
//         setFeedbackData((prevData) =>
//           prevData.map((feedback) =>
//             feedback.id === selectedFeedback.id
//               ? { ...feedback, feedbackText: updatedFeedback }
//               : feedback
//           )
//         );
//         setSelectedFeedback(null); // Clear the selected feedback
//       })
//       .catch((error) => console.error('Error updating feedback:', error));
//   };

  return (
    <div className="feedback-table">
      <table>
        <thead>
          <tr>
            <th>Input Language</th>
            <th>Output Language</th>
            <th>Feedback Text</th>
            <th>Options</th>
            </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.word}</td>
              <td>{feedback.sword}</td>
              <td>{feedback.feedbackText}</td>
              <td>                
                <button className="update-button" onClick={(e) => {
                    e.preventDefault();
                    
                }}>Update</button>
                <button className="delete-button" onClick={(e) => {
                    e.preventDefault();
                    handleDelete(feedback._id);
                }}>Delete</button>
              </td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;