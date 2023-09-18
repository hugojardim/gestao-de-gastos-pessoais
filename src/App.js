import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import { Resumo } from "./pages/Resumo";
import { TotalGastosProvider } from "./context/TotalGastos";

function App() {
  return (
    <div className="App">
      <Router>
        <TotalGastosProvider>
          <Routes>
            <Route path="/index" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resumo" element={<Resumo />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </TotalGastosProvider>
      </Router>
    </div>
  );
}

export default App;