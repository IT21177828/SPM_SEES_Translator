import React from "react";
import Translate from "./pages/Translate";
import History from "./pages/history/History";
import BadWordHistory from "./pages/BadWordHistory";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Translate/>}/>
        <Route path="/history" element={<History />}/>
        <Route path="/BadWord" element={<BadWordHistory/>}/>        
      </Routes>
    </Router>
  );
};

export default App;
