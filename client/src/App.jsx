// client/src/App.jsx

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 1. State to hold the status message from the backend
  const [status, setStatus] = useState("Loading API status...");

  // The base URL for your Express backend
  const API_URL = "http://localhost:5000/api/health";

  // 2. useEffect hook to run the fetch operation when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (response.ok && data.status.includes("healthy")) {
          // Success case: Backend is up and connected to DB
          setStatus(`Status: Healthy (DB Time: ${data.dbTimestamp})`);
        } else {
          // Error case: Backend responded, but with an error status
          setStatus(`API Error: ${data.message || "Unknown server error."}`);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        // Failure case: Could not reach the backend server at all
        setStatus(
          `API Error: Could not reach backend server at ${API_URL}. Is the server running?`
        );
      }
    };
    fetchData();
  }, []); // The empty array [] ensures this runs only ONCE when the component first loads

  // Determine the visual style based on the status message
  const isHealthy = status.includes("Healthy");

  return (
    <div className="App">
      <h1>PERN Stack Boilerplate (JS Focused)</h1>
      <h2>Frontend (React JS) Status: Running!</h2>
      <p>Attempting to connect to the Backend (Express/PostgreSQL)...</p>

      {/* The status box will visually confirm the connection */}
      <div className={`status-box ${isHealthy ? "success" : "error"}`}>
        {status}
      </div>

      <p className="docs-info">
        You are successfully running a PERN stack! Focus now on React components
        in <code>client/</code>.
      </p>
    </div>
  );
}

export default App;
