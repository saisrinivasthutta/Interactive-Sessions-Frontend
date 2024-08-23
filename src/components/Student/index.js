import React, { useState } from "react";
import Table from "rc-table";
import "./index.css";

const expertises = [
  { id: 1, name: "Finance" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Operations Management" },
  { id: 4, name: "Strategic Management" },
  { id: 5, name: "Human Resources" },
  { id: 6, name: "International Business" },
  { id: 7, name: "Entrepreneurship" },
  { id: 8, name: "Information Technology" },
  { id: 9, name: "Supply Chain Management" },
  { id: 10, name: "Business Analytics" },
  { id: 11, name: "Leadership" },
  { id: 12, name: "Corporate Governance" },
  { id: 13, name: "Project Management" },
  { id: 14, name: "Digital Marketing" },
  { id: 15, name: "E-commerce" },
  { id: 16, name: "Data Science" },
  { id: 17, name: "Cybersecurity" },
  { id: 18, name: "Sustainability" },
  { id: 19, name: "Healthcare Management" },
];

const Student = () => {
  const [studentId, setStudentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [showSchedules, setShowSchedules] = useState(false);
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);
  const [expertiseId, setExpertiseId] = useState("1");
  const [duration, setDuration] = useState("30");
  const [scheduleTime, setScheduleTime] = useState("");
  const [mentorId, setMentorId] = useState();
  const [availableMentors, setAvailableMentorsList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (studentId < 1 || studentId > 26) {
      setErrorMessage("Student ID must be between 1 and 26");
      return;
    }

    try {
      const response = await fetch(
        `https://interactive-sessions-server.onrender.com/api/scheduler/student/${studentId}`
      );
      if (!response.ok) {
        throw new Error("Failed to retrieve schedules");
      }
      const data = await response.json();
      setSchedules(data.sessions);
      setShowSchedules(true);
    } catch (error) {
      setErrorMessage("Failed to retrieve schedules");
    }
  };

  const onShowNewSessionForm = () => {
    setShowNewSessionForm(!showNewSessionForm);
  };

  const handleNewSessionSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!expertiseId || !duration || !scheduleTime || !mentorId) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const response = await fetch(
        `https://interactive-sessions-server.onrender.com/api/scheduler/schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId,
            mentorId,
            expertiseId,
            duration,
            scheduleTime,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create schedule");
      }
      try {
        const response = await fetch(
          `https://interactive-sessions-server.onrender.com/api/scheduler/student/${studentId}`
        );
        if (!response.ok) {
          throw new Error("Failed to retrieve schedules");
        }
        const data = await response.json();
        setSchedules(data.sessions);
        setShowSchedules(true);
      } catch (error) {
        setErrorMessage("Failed to retrieve schedules");
      }
      console.log(duration + typeof duration);
      let amount = 0;
      if (duration === "30") amount = 1000;
      else if (duration === "45") amount = 1500;
      else amount = 2000;
      alert(`Payment of ${amount} is Done!!! Schedule created successfully! `);
      setShowNewSessionForm(false);
      setExpertiseId("");
      setDuration("");
      setScheduleTime("");
    } catch (error) {
      setErrorMessage("Failed to create schedule");
    }
  };

  const fetchAvailableMentors = async () => {
    try {
      const response = await fetch(
        `https://interactive-sessions-server.onrender.com/api/scheduler/available?expertiseId=${expertiseId}&scheduleTime=${scheduleTime}`
      );
      const data = await response.json();
      setAvailableMentorsList(data.mentors);
      console.log(data);
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
      title: "Mentor ID",
      dataIndex: "mentorId",
      key: "mentorId",
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
      title: "Schedule Time",
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
        <h1>Student Schedules</h1>
      </div>
    </nav>
  );

  const renderIdForm = () => (
    <form onSubmit={handleSubmit}>
      <label htmlFor="studentId">Enter Student ID :</label>
      <input
        type="number"
        id="studentId"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );

  const renderSessions = () => (
    <>
      <h2>Your Schedules</h2>
      <Table columns={columns} data={schedules} />
      <button
        className="create-new-session-btn"
        type="button"
        onClick={onShowNewSessionForm}
      >
        Book a New Session Now!!
      </button>
    </>
  );

  const renderNewSessionsForm = () => (
    <form onSubmit={handleNewSessionSubmit}>
      <label htmlFor="expertise">Expertise:</label>
      <select
        id="expertise"
        onChange={(e) => setExpertiseId(e.target.value)}
        required
      >
        {expertises.map((expertise) => (
          <option value={expertise.id}>{expertise.name}</option>
        ))}
      </select>

      <label htmlFor="duration">Duration:</label>
      <select
        id="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      >
        <option value="30">30 minutes</option>
        <option value="45">45 minutes</option>
        <option value="60">60 minutes</option>
      </select>

      <label htmlFor="scheduleTime">Schedule Time:</label>
      <input
        type="time"
        id="scheduleTime"
        value={scheduleTime}
        onChange={(e) => setScheduleTime(e.target.value)}
        required
      />
      <button
        type="button"
        className="available-mentors-btn "
        onClick={fetchAvailableMentors}
      >
        Load Available Mentors
      </button>
      <select
        id="mentor"
        onChange={(e) => setMentorId(e.target.value)}
        required
      >
        <option value="">Choose Mentors</option>
        {availableMentors.map((mentor) => (
          <option value={mentor.id}>{mentor.name}</option>
        ))}
      </select>
      <button type="submit">Create Schedule</button>
    </form>
  );

  return (
    <div className="student-container">
      {renderNavbar()}
      <div className="content">
        {!showSchedules && renderIdForm()}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {showSchedules && renderSessions()}
        {showNewSessionForm && renderNewSessionsForm()}
      </div>
    </div>
  );
};

export default Student;
