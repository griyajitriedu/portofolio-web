import React from "react";
import PDFViewer from "./PDFViewer";
import samplePDF from "./PORTOFOLIO.pdf"; // Make sure this file exists in your public or src folder
import './App.css';

const App = () => {
  document.title = "Jitri Portofolio";
  return (
    <div className="app-container">
      <div
        className="app">
        <PDFViewer file={samplePDF} />
      </div>

    </div>
  );
};

export default App;
