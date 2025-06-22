import { useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Signin from './assets/comonents/Signin'
import Navbar from './assets/comonents/layout/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        {/* Define your routes here */}
        {/* Example: */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App
