// src/Layout/StudentLayout.js
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./StudentLayout.css";
import logo from "../../../Assets/Img/logo.png";
import { useAuth } from "../../../context/AuthContext";


// Dummy timetable data (based on class)
const timetableData = {
  "10A": [
    {
      day: "Monday",
      subjects: [
        { name: "Maths", time: "9:30 AM" },
        { name: "Physics", time: "10:30 AM" },
        { name: "Chemistry", time: "11:30 AM" },
        { name: "Organic Chemistry", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Maths", time: "2:30 PM" },
        { name: "Physics", time: "3:30 PM" },
        { name: "Chemistry", time: "4:30 PM" },
      ],
    },
    {
      day: "Tuesday",
      subjects: [
        { name: "Physics", time: "9:30 AM" },
        { name: "Chemistry", time: "10:30 AM" },
        { name: "Maths", time: "11:30 AM" },
        { name: "Organic Chemistry", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Maths", time: "2:30 PM" },
        { name: "Physics", time: "3:30 PM" },
        { name: "Chemistry", time: "4:30 PM" },
      ],
    },
    {
      day: "Wednesday",
      subjects: [
        { name: "Maths", time: "9:30 AM" },
        { name: "Physics", time: "10:30 AM" },
        { name: "Chemistry", time: "11:30 AM" },
        { name: "Organic Chemistry", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Maths", time: "2:30 PM" },
        { name: "Physics", time: "3:30 PM" },
        { name: "Chemistry", time: "4:30 PM" },
      ],
    },
    {
      day: "Thursday",
      subjects: [
        { name: "Maths", time: "9:30 AM" },
        { name: "Physics", time: "10:30 AM" },
        { name: "Chemistry", time: "11:30 AM" },
        { name: "Organic Chemistry", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Maths", time: "2:30 PM" },
        { name: "Physics", time: "3:30 PM" },
        { name: "Chemistry", time: "4:30 PM" },
      ],
    },
    {
      day: "Friday",
      subjects: [
        { name: "Maths", time: "9:30 AM" },
        { name: "Physics", time: "10:30 AM" },
        { name: "Chemistry", time: "11:30 AM" },
        { name: "Organic Chemistry", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Maths", time: "2:30 PM" },
        { name: "Physics", time: "3:30 PM" },
        { name: "Chemistry", time: "4:30 PM" },
      ],
    },
  ],

  "10B": [
    {
      day: "Monday",
      subjects: [
        { name: "English", time: "9:30 AM" },
        { name: "Biology", time: "10:30 AM" },
        { name: "Maths", time: "11:30 AM" },
        { name: "Physics", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:30 PM" },
        { name: "Chemistry", time: "3:30 PM" },
        { name: "Games", time: "4:30 PM" },
      ],
    },
    {
      day: "Tuesday",
      subjects: [
        { name: "Biology", time: "9:30 AM" },
        { name: "Maths", time: "10:30 AM" },
        { name: "English", time: "11:30 AM" },
        { name: "Physics", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:30 PM" },
        { name: "Chemistry", time: "3:30 PM" },
        { name: "Games", time: "4:30 PM" },
      ],
    },
    {
      day: "Wednesday",
      subjects: [
        { name: "Maths", time: "9:30 AM" },
        { name: "Physics", time: "10:30 AM" },
        { name: "Chemistry", time: "11:30 AM" },
        { name: "Biology", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "English", time: "2:30 PM" },
        { name: "Social", time: "3:30 PM" },
        { name: "Games", time: "4:30 PM" },
      ],
    },
    {
      day: "Thursday",
      subjects: [
        { name: "English", time: "9:30 AM" },
        { name: "Biology", time: "10:30 AM" },
        { name: "Maths", time: "11:30 AM" },
        { name: "Physics", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:30 PM" },
        { name: "Chemistry", time: "3:30 PM" },
        { name: "Games", time: "4:30 PM" },
      ],
    },
    {
      day: "Friday",
      subjects: [
        { name: "Biology", time: "9:30 AM" },
        { name: "Maths", time: "10:30 AM" },
        { name: "English", time: "11:30 AM" },
        { name: "Physics", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:30 PM" },
        { name: "Chemistry", time: "3:30 PM" },
        { name: "Games", time: "4:30 PM" },
      ],
    },
    {
      day: "Saturday",
      subjects: [
        { name: "Maths", time: "9:30 AM" },
        { name: "Physics", time: "10:30 AM" },
        { name: "Chemistry", time: "11:30 AM" },
        { name: "Biology", time: "12:30 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "English", time: "2:30 PM" },
        { name: "Social", time: "3:30 PM" },
        { name: "Games", time: "4:30 PM" },
      ],
    },
  ],

  "9A": [
    {
      day: "Monday",
      subjects: [
        { name: "Biology", time: "9:00 AM" },
        { name: "Maths", time: "10:00 AM" },
        { name: "Social", time: "11:00 AM" },
        { name: "Chemistry", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "English", time: "2:00 PM" },
        { name: "Physics", time: "3:00 PM" },
        { name: "Library", time: "4:00 PM" },
      ],
    },
    {
      day: "Tuesday",
      subjects: [
        { name: "Maths", time: "9:00 AM" },
        { name: "English", time: "10:00 AM" },
        { name: "Biology", time: "11:00 AM" },
        { name: "Chemistry", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:00 PM" },
        { name: "Physics", time: "3:00 PM" },
        { name: "Library", time: "4:00 PM" },
      ],
    },
    {
      day: "Wednesday",
      subjects: [
        { name: "English", time: "9:00 AM" },
        { name: "Maths", time: "10:00 AM" },
        { name: "Biology", time: "11:00 AM" },
        { name: "   Chemistry", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:00 PM" },
        { name: "Physics", time: "3:00 PM" },
        { name: "Library", time: "4:00 PM" },
      ],
    },
    {
      day: "Thursday",
      subjects: [
        { name: "Biology", time: "9:00 AM" },
        { name: "Maths", time: "10:00 AM" },
        { name: "Social", time: "11:00 AM" },
        { name: "Chemistry", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "English", time: "2:00 PM" },
        { name: "Physics", time: "3:00 PM" },
        { name: "Library", time: "4:00 PM" },
      ],
    },
    {
      day: "Friday",
      subjects: [
        { name: "Maths", time: "9:00 AM" },
        { name: "English", time: "10:00 AM" },
        { name: "Biology", time: "11:00 AM" },
        { name: "Chemistry", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:00 PM" },
        { name: "Physics", time: "3:00 PM" },
        { name: "Library", time: "4:00 PM" },
      ],
    },
    {
      day: "Saturday",
      subjects: [
        { name: "Maths", time: "9:00 AM" },
        { name: "English", time: "10:00 AM" },
        { name: "Biology", time: "11:00 AM" },
        { name: "Chemistry", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:00 PM" },
        { name: "Physics", time: "3:00 PM" },
        { name: "Library", time: "4:00 PM" },
      ],
    },
  ],

  "9B": [
    {
      day: "Monday",
      subjects: [
        { name: "Maths", time: "9:15 AM" },
        { name: "English", time: "10:15 AM" },
        { name: "Biology", time: "11:15 AM" },
        { name: "Chemistry", time: "12:15 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:15 PM" },
        { name: "Games", time: "3:15 PM" },
        { name: "Computer", time: "4:15 PM" },
      ],
    },
    {
      day: "Tuesday",
      subjects: [
        { name: "English", time: "9:15 AM" },
        { name: "Maths", time: "10:15 AM" },
        { name: "Biology", time: "11:15 AM" },
        { name: "Chemistry", time: "12:15 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:15 PM" },
        { name: "Games", time: "3:15 PM" },
        { name: "Computer", time: "4:15 PM" },
      ],
    },
    {
      day: "Wednesday",
      subjects: [
        { name: "Maths", time: "9:15 AM" },
        { name: "English", time: "10:15 AM" },
        { name: "Biology", time: "11:15 AM" },
        { name: "Chemistry", time: "12:15 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:15 PM" },
        { name: "Games", time: "3:15 PM" },
        { name: "Computer", time: "4:15 PM" },
      ],
    },
    {
      day: "Thursday",
      subjects: [
        { name: "English", time: "9:15 AM" },
        { name: "Maths", time: "10:15 AM" },
        { name: "Biology", time: "11:15 AM" },
        { name: "Chemistry", time: "12:15 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:15 PM" },
        { name: "Games", time: "3:15 PM" },
        { name: "Computer", time: "4:15 PM" },
      ],
    },
    {
      day: "Friday",
      subjects: [
        { name: "Maths", time: "9:15 AM" },
        { name: "English", time: "10:15 AM" },
        { name: "Biology", time: "11:15 AM" },
        { name: "Chemistry", time: "12:15 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:15 PM" },
        { name: "Games", time: "3:15 PM" },
        { name: "Computer", time: "4:15 PM" },
      ],
    },
    {
      day: "Saturday",
      subjects: [
        { name: "Maths", time: "9:15 AM" },
        { name: "English", time: "10:15 AM" },
        { name: "Biology", time: "11:15 AM" },
        { name: "Chemistry", time: "12:15 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:15 PM" },
        { name: "Games", time: "3:15 PM" },
        { name: "Computer", time: "4:15 PM" },
      ],
    },
  ],

  "8A": [
    {
      day: "Monday",
      subjects: [
        { name: "English", time: "8:30 AM" },
        { name: "Maths", time: "9:30 AM" },
        { name: "Science", time: "10:30 AM" },
        { name: "Drawing", time: "11:30 AM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "1:30 PM" },
        { name: "Library", time: "2:30 PM" },
        { name: "Games", time: "3:30 PM" },
      ],
    },
    {
      day: "Tuesday",
      subjects: [
        { name: "Maths", time: "8:30 AM" },
        { name: "English", time: "9:30 AM" },
        { name: "Science", time: "10:30 AM" },
        { name: "Drawing", time: "11:30 AM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "1:30 PM" },
        { name: "Library", time: "2:30 PM" },
        { name: "Games", time: "3:30 PM" },
      ],
    },
    {
      day: "Wednesday",
      subjects: [
        { name: "English", time: "8:30 AM" },
        { name: "Maths", time: "9:30 AM" },
        { name: "Science", time: "10:30 AM" },
        { name: "Drawing", time: "11:30 AM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "1:30 PM" },
        { name: "Library", time: "2:30 PM" },
        { name: "Games", time: "3:30 PM" },
      ],
    },
    {
      day: "Thursday",
      subjects: [
        { name: "Maths", time: "8:30 AM" },
        { name: "English", time: "9:30 AM" },
        { name: "Science", time: "10:30 AM" },
        { name: "Drawing", time: "11:30 AM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "1:30 PM" },
        { name: "Library", time: "2:30 PM" },
        { name: "Games", time: "3:30 PM" },
      ],
    },
    {
      day: "Friday",
      subjects: [
        { name: "English", time: "8:30 AM" },
        { name: "Maths", time: "9:30 AM" },
        { name: "Science", time: "10:30 AM" },
        { name: "Drawing", time: "11:30 AM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "1:30 PM" },
        { name: "Library", time: "2:30 PM" },
        { name: "Games", time: "3:30 PM" },
      ],
    },
    {
      day: "Saturday",
      subjects: [
        { name: "Maths", time: "8:30 AM" },
        { name: "English", time: "9:30 AM" },
        { name: "Science", time: "10:30 AM" },
        { name: "Drawing", time: "11:30 AM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "1:30 PM" },
        { name: "Library", time: "2:30 PM" },
        { name: "Games", time: "3:30 PM" },
      ],
    },
  ],

  "8B": [
    {
      day: "Monday",
      subjects: [
        { name: "Maths", time: "9:00 AM" },
        { name: "English", time: "10:00 AM" },
        { name: "Science", time: "11:00 AM" },
        { name: "Computer", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:00 PM" },
        { name: "Drawing", time: "3:00 PM" },
        { name: "Games", time: "4:00 PM" },
      ],
    },
    {
      day: "Tuesday",
      subjects: [
        { name: "English", time: "9:00 AM" },
        { name: "Maths", time: "10:00 AM" },
        { name: "Science", time: "11:00 AM" },
        { name: "Computer", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:00 PM" },
        { name: "Drawing", time: "3:00 PM" },
        { name: "Games", time: "4:00 PM" },
      ],
    },
    {
      day: "Wednesday",
      subjects: [
        { name: "Maths", time: "9:00 AM" },
        { name: "English", time: "10:00 AM" },
        { name: "Science", time: "11:00 AM" },
        { name: "Computer", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:00 PM" },
        { name: "Drawing", time: "3:00 PM" },
        { name: "Games", time: "4:00 PM" },
      ],
    },
    {
      day: "Thursday",
      subjects: [
        { name: "English", time: "9:00 AM" },
        { name: "Maths", time: "10:00 AM" },
        { name: "Science", time: "11:00 AM" },
        { name: "Computer", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:00 PM" },
        { name: "Drawing", time: "3:00 PM" },
        { name: "Games", time: "4:00 PM" },
      ],
    },
    {
      day: "Friday",
      subjects: [
        { name: "Maths", time: "9:00 AM" },
        { name: "English", time: "10:00 AM" },
        { name: "Science", time: "11:00 AM" },
        { name: "Computer", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:00 PM" },
        { name: "Drawing", time: "3:00 PM" },
        { name: "Games", time: "4:00 PM" },
      ],
    },
    {
      day: "Saturday",
      subjects: [
        { name: "English", time: "9:00 AM" },
        { name: "Maths", time: "10:00 AM" },
        { name: "Science", time: "11:00 AM" },
        { name: "Computer", time: "12:00 PM" },
        { name: "Lunch Break", isBreak: true },
        { name: "Social", time: "2:00 PM" },
        { name: "Drawing", time: "3:00 PM" },
        { name: "Games", time: "4:00 PM" },
      ],
    },
  ],
};

export default function StudentLayout() {
  const { user } = useAuth(); // Assumes student user is logged in
  const navigate = useNavigate();
  const location = useLocation();
  const [timetable, setTimetable] = useState({});
  const studentClass = user?.class || "10 A";
  const classTimetable = timetableData[studentClass] || [];
  const studentName = user?.name || "Student"; // Fallback name
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    setTimetable(timetableData[studentClass] || {});
  }, [studentClass]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const notifications = [
    "New class scheduled for tomorrow.",
    "Teacher attendance updated.",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="s-sidebar d-flex flex-column p-4 text-white">
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="SR EDUTIME Logo"
            className="img-fluid main-logo"
          />
          <h4 className="m-0">SR EDUTIME</h4>
        </div>

        <Link
          to="."
          className={`s-link ${
            location.pathname.endsWith("/dashboard") ||
            location.pathname === "/student"
              ? "active"
              : ""
          }`}
        >
          <i className="bi bi-speedometer2 me-2" /> Dashboard
        </Link>
      </aside>

      <section className="flex-grow-1">
        <header className="bg-light px-4 py-3 d-flex align-items-right border-bottom">
          <div className="ms-auto d-flex align-items-center gap-3">
            <div className="position-relative" ref={notificationRef}>
              <button
                className="btn btn-dark border rounded-pill position-relative"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                style={{ height: "40px", width: "40px" }}
              >
                <i className="bi bi-bell fs-6"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications.length}
                </span>
              </button>

              {showNotifications && (
                <div
                  className="position-absolute bg-white border rounded shadow p-2 mt-1 text-black"
                  style={{ right: 0, width: "250px", zIndex: 1000 }}
                >
                  <h6 className="mb-2">Notifications</h6>
                  <ul className="list-unstyled mb-0">
                    {notifications.map((note, idx) => (
                      <li key={idx} className="mb-1 small">
                        <i className="bi bi-info-circle me-2 text-primary"></i>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="position-relative" ref={profileRef}>
              <button
                className="btn btn-dark border rounded-pill position-relative"
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                style={{ height: "40px", width: "40px" }}
              >
                <i className="bi bi-person-circle fs-6"></i>
              </button>

              {showProfile && (
                <div
                  className="position-absolute bg-white border rounded shadow p-3 mt-2"
                  style={{ right: 0, width: "250px", zIndex: 1000 }}
                >
                  <div className="mb-2 text-black">
                    <strong>{studentName}</strong>
                    <br />
                    <small>{studentClass}</small>
                    <br />
                    <small>{user?.employeeId}</small>
                  </div>

                  <button
                    className="btn btn-outline-primary btn-sm w-100 mb-2"
                    onClick={() => navigate("/change-password")}
                  >
                    <i className="bi bi-key me-2"></i>Change Password
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-grow-1 bg-light">
          {/* Timetable Display */}
          <div className="container-fluid my-5">
            <div className="timetable-wrapper d-flex align-items-center flex-column justify-content-center">
              {classTimetable.map((row, index) => (
                <div className="d-flex align-items-center mb-3" key={index}>
                  <div className="me-3 fw-semibold" style={{ width: "90px" }}>
                    {row.day}
                  </div>
                  <div className="d-flex flex-wrap gap-4">
                    {row.subjects.map((subject, idx) =>
                      subject.isBreak ? (
                        <div
                          className="lunch-break text-primary fw-semibold border border-primary px-3 py-2 rounded"
                          key={idx}
                        >
                          {subject.name}
                        </div>
                      ) : (
                        <div
                          className="subject-card bg-info text-dark rounded p-2 px-3"
                          key={idx}
                        >
                          <div className="fw-semibold">{subject.name}</div>
                          <div className="d-flex justify-content-center align-items-center">
                            <div
                              className="fw-light"
                              style={{ fontSize: "0.85rem" }}
                            >
                              {subject.time}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
