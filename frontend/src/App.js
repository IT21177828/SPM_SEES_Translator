import BadWordHistory from "./pages/BadWordHistory";
import Translate from "./pages/Translate";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Translate/>}/>
        <Route path="/BadWord" element={<BadWordHistory/>}/>        
      </Routes>
    </Router>    
  );
};

export default App;


