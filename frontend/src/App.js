import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Translate from "./pages/Translate";
import History from "./pages/history/History";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Translate />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
