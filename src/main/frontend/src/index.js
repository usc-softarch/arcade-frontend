import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ArchRecovery from "./pages/ArchRecovery";
import FactExtraction from "./pages/FactExtraction";
import Metrics from "./pages/Metrics";
import SmellDetection from "./pages/SmellDetection";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/archrecovery" element={<ArchRecovery />} />
              <Route path="/factextraction" element={<FactExtraction />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/smelldetection" element={<SmellDetection />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
