import React, { useState } from "react";
import Table from "rc-table";

import "./index.css";

const Mentor = () => {
  const [mentorId, setMentorId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [showSchedules, setShowSchedules] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (mentorId < 1 || mentorId > 26) {
      setErrorMessage("Mentor ID must be between 1 and 26");
      return;
    }

    try {
      const response = await fetch(
        `https://interactive-sessions-server.onrender.com/api/scheduler/mentor/${mentorId}`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to retrieve schedules");
      }
      const data = await response.json();
      console.log(data);
      setSchedules(data.sessions);
      setShowSchedules(true);
    } catch (error) {
      setErrorMessage("Failed to retrieve schedules");
    }
  };

  const columns = [
    {
      title: "Session ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Expertise ID",
      dataIndex: "expertiseId",
      key: "expertiseId",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Session Time",
      dataIndex: "scheduleTime",
      key: "scheduleTime",
    },
  ];

  const renderNavbar = () => (
    <nav className="navbar">
      <div className="logo-container">
        <img
          src="https://www.dmguidance.ie/wp-content/uploads/2020/09/One-to-One-Sessions-1-600x400.jpg"
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="welcome-note">
        <h1>Mentor Sessions</h1>
      </div>
    </nav>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <label htmlFor="mentorId">Enter Mentor ID (1-26):</label>
      <input
        type="number"
        id="mentorId"
        value={mentorId}
        onChange={(e) => setMentorId(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );

  const renderSessions = () => (
    <>
      <h2>Your Scheduled Sessions</h2>
      <Table columns={columns} data={schedules} />
    </>
  );

  return (
    <div className="mentor-container">
      {renderNavbar()}
      <div className="content">
        {!showSchedules && renderForm()}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {showSchedules && renderSessions()}
      </div>
    </div>
  );
};

export default Mentor;
