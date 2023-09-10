import React from "react";
import Translate from "./pages/Translate";
//import History from "./pages/history/History";
import BadWordHistory from "./pages/BadWordHistory";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import SavedWords from "./pages/savedWord/SavedWord";
import TranslationHistory from "./pages/history/TranslationHistory";
import TranslationSaved from "./pages/savedWord/TranslationSaved";
import { Checkout } from "./pages/checkout/Checkout";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import FeedbackTable from "./pages/feedback/FedbackTable";
import MemberShipPlan from "./pages/membershipPlans/MemberShipPlan"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Translate/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/feedback"  element={<FeedbackTable/>}/>
        <Route path="/register"  element={<Registration/>}/>
        <Route path="/saved" element={<TranslationSaved/>}/>
        <Route path="/history" element={<TranslationHistory/>}/>
        <Route path="/BadWord" element={<BadWordHistory/>}/> 
        <Route path="/checkout" element={<Checkout/>}/>      
        <Route path="/memberships" element={<MemberShipPlan/>}/>    

      </Routes>
    </Router>
  );
};

export default App;
