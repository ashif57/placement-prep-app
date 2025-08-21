import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QuantTest from './pages/QuantTest';
import LogicalTest from './pages/LogicalTest';
import VerbalTest from './pages/VerbalTest';
import EssayTest from './pages/EssayTest';
import CodingTest from './pages/CodingTest';
import Result from './pages/Result';
import ResultDetails from './pages/ResultDetails';


function App() {
  return (
    <Router>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Set Dashboard as default */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test/quant" element={<QuantTest />} />
          <Route path="/test/logical" element={<LogicalTest />} />
          <Route path="/test/verbal" element={<VerbalTest />} />
          <Route path="/test/essay" element={<EssayTest />} />
          <Route path="/test/coding" element={<CodingTest />} />
          <Route path="/result" element={<Result />} />
          <Route path="/result/:id" element={<ResultDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
