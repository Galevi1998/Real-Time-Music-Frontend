import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Signin from "./assets/comonents/Auth/Signin";
import Signup from "./assets/comonents/Auth/signUp/Signup";

import Navbar from "./assets/comonents/layout/Navbar";
import bgImage from "./media/clef.jpg";

function App() {
  return (
    <>
      <Navbar />

      <div className="relative min-h-screen overflow-hidden bg-black/20 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        <Router>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
