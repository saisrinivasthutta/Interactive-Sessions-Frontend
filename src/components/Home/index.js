import React from "react";
import { Link } from "react-router-dom";
import "./index.css"; // Import the CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo-container">
          <img
            src="https://www.dmguidance.ie/wp-content/uploads/2020/09/One-to-One-Sessions-1-600x400.jpg"
            alt="Logo"
            className="logo"
          />
        </div>
        <div className="welcome-note">
          <h1>Welcome to Interactive Sessions</h1>
        </div>
      </nav>
      <div className="cards-container">
        <div className="card student-card">
          <img
            src="https://static.vecteezy.com/system/resources/previews/008/154/360/non_2x/student-logo-vector.jpg"
            alt="student"
          />
          <Link to="/student" className="link">
            I am a Student
          </Link>
        </div>
        <div className="card mentor-card">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.xmjpuH2-D4LmdreVHpuR5QHaJ4&pid=Api&P=0&h=180"
            alt="mentor"
          />
          <Link to="/mentor" className="link">
            I am a Mentor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
