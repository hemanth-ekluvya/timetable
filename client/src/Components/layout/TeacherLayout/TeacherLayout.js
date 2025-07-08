import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TeacherLayout.css";
import logo from "../../../Assets/Img/logo.png";
import { useAuth } from "../../../context/AuthContext";

const timetableData = {
  "2025-07-07": [
    {
      classId: "Class_1",
      timing: "8:00 AM",
      className: "Class 10 A",
      subject: "Dielectric and electric...",
      room: "Room No. 05",
    },
    {
      classId: "Class_2",
      timing: "9:00 AM",
      className: "Class 10 B",
      subject: "Magnetism and matter...",
      room: "Room No. 02",
    },
    {
      classId: "Class_4",
      timing: "11:00 AM",
      className: "Class 9 B",
      subject: "Atoms and molecules...",
      room: "Room No. 07",
    },
    {
      classId: "Class_5",
      timing: "12:00 PM",
      className: "Class 8 A",
      subject: "Force and pressure...",
      room: "Room No. 08",
    },
    {
      classId: "Class_6",
      timing: "01:00 PM",
      className: "Class 8 B",
      subject: "Friction and motion...",
      room: "Room No. 04",
    },
  ],
  "2025-07-08": [
    {
      classId: "Class_3",
      timing: "10:00 AM",
      className: "Class 9 A",
      subject: "Light and shadows...",
      room: "Room No. 01",
    },
    {
      classId: "Class_7",
      timing: "02:00 PM",
      className: "Class 10 C",
      subject: "Thermodynamics...",
      room: "Room No. 03",
    },
    {
      classId: "Class_8",
      timing: "03:00 PM",
      className: "Class 8 C",
      subject: "Work and energy...",
      room: "Room No. 06",
    },
  ],
  "2025-07-09": [
    {
      classId: "Class_9",
      timing: "8:00 AM",
      className: "Class 10 A",
      subject: "Electromagnetic waves...",
      room: "Room No. 05",
    },
    {
      classId: "Class_10",
      timing: "9:00 AM",
      className: "Class 10 B",
      subject: "Quantum mechanics...",
      room: "Room No. 02",
    },
    {
      classId: "Class_11",
      timing: "11:00 AM",
      className: "Class 9 B",
      subject: "Nuclear physics...",
      room: "Room No. 07",
    },
    {
      classId: "Class_12",
      timing: "12:00 PM",
      className: "Class 8 A",
      subject: "Thermal properties of matter...",
      room: "Room No. 08",
    },
  ],
  "2025-07-10": [
    {
      classId: "Class_13",
      timing: "10:00 AM",
      className: "Class 9 A",
      subject: "Oscillations and waves...",
      room: "Room No. 01",
    },
    {
      classId: "Class_14",
      timing: "02:00 PM",
      className: "Class 10 C",
      subject: "Optics...",
      room: "Room No. 03",
    },
    {
      classId: "Class_15",
      timing: "03:00 PM",
      className: "Class 8 C",
      subject: "Kinematics...",
      room: "Room No. 06",
    },
  ],
};

const getKey = (d) => format(d, "yyyy-MM-dd");

export default function TeacherLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pickerOpen, setPickerOpen] = useState(false);
  const [dayTimetable, setDayTimetable] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const formattedDate = format(selectedDate, "dd-MM-yy");
  const dayName = format(selectedDate, "EEE");

  const { user } = useAuth(); // 👈  get current teacher (& logout)

  const teacherName = user?.name || "Teacher";
  const picked = useMemo(() => getKey(selectedDate), [selectedDate]);

  /* timetable: now keyed by teacher id + date */
  const timetableForDay = useMemo(() => {
    const key = `${user?.id}-${getKey(picked)}`;
    return timetableData[key] ?? [];
  }, [picked, user]);

  const dayTable = useMemo(
    () => timetableData[getKey(selectedDate)] ?? [],
    [selectedDate]
  );

  useEffect(() => {
    if (timetableData[getKey(selectedDate)]) {
      setDayTimetable(timetableData[getKey(selectedDate)]);
    } else {
      setDayTimetable([]);
    }
  }, [selectedDate]);

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
            location.pathname === "/teacher"
              ? "active"
              : ""
          }`}
        >
          <i className="bi bi-speedometer2 me-2" /> Dashboard
        </Link>

        <Link
          to="allotted-classes"
          className={`s-link ${
            location.pathname.includes("allotted-classes") ? "active" : ""
          }`}
        >
          <i className="bi bi-journal-text me-2" /> Allotted Classes
        </Link>

        <Link
          to="syallabus"
          className={`s-link ${
            location.pathname.includes("syallabus") ? "active" : ""
          }`}
        >
          <i className="bi bi-journal-bookmark me-2" /> Syallabus
        </Link>

        <Link
          to="attendance"
          className={`s-link ${
            location.pathname.includes("attendance") ? "active" : ""
          }`}
        >
          <i className="bi bi-check2-square me-2" /> Attendance
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
                    <strong>{teacherName}</strong>
                    <br />
                    <small>{user?.subject}</small>
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

        {/* Main dashboard content */}
        {location.pathname === "/teacher" ||
        location.pathname.endsWith("/dashboard") ? (
          <div className="p-4">
            <div className="d-flex align-items-center position-relative gap-2 margin-bottom-4">
              <span className="fw-bold">{formattedDate}</span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
                alt="calendar"
                width="28"
                style={{ cursor: "pointer" }}
                onClick={() => setPickerOpen((o) => !o)}
              />
              <div className="bg-light px-2 rounded fw-bold">{dayName}</div>
              {pickerOpen && (
                <div
                  className="position-absolute"
                  style={{ top: "40px", zIndex: 10 }}
                >
                  <DatePicker
                    inline
                    selected={selectedDate}
                    onChange={(d) => {
                      setSelectedDate(d);
                      setPickerOpen(false);
                    }}
                  />
                </div>
              )}
            </div>

            {dayTable.length === 0 ? (
              <p className="text-muted">No periods scheduled for this date.</p>
            ) : (
              <div className="row">
                {dayTable.map((item, idx) => (
                  <div key={idx} className="col-md-3 mb-4 mt-4">
                    <div className="card border shadow-sm">
                      <div
                        className="card-header text-white p-2 d-flex justify-content-between"
                        style={{ backgroundColor: "#007bff" }} // darker blue
                      >
                        <span>{item.classId}</span>
                        <span>{item.timing}</span>
                      </div>
                      <div className="card-body p-2">
                        <div className="d-flex justify-content-between">
                          <h6 className="mb-1">{item.className}</h6>
                          <span className="text-muted small">{item.room}</span>
                        </div>
                        <p className="small text-truncate mb-2">
                          {item.subject}
                        </p>
                        <p className="mt-3 mb-0 text-end">
                          <Link
                            to="syallabus"
                            className="fw-bold text-dark"
                          >
                            View Syllabus
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Outlet />
        )}
      </section>
    </div>
  );
}
