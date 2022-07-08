

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Coin from "./Components/Coin";
import CryptoTable from './Components/CryptoTable';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CryptoTable />} />
          <Route path="/coin/:id" element={<Coin />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
