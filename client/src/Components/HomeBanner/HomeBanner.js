import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../../Assets/Img/logo.png";
import "./HomeBanner.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../context/AuthContext";

const HomeBanner = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();
  const principalName = user?.name || "Principal";

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

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="app-wrapper container-fluid d-flex">
      <div className="s-sidebar d-flex flex-column p-4 text-white">
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
            location.pathname === "/principal"
              ? "active"
              : ""
          }`}
        >
          <i className="bi bi-speedometer2 me-2" /> Dashboard
        </Link>

        <Link
          to="/principal/dashboard/TeacherAttendance"
          className={`s-link ${
            location.pathname.includes("/principal/dashboard/TeacherAttendance")
              ? "active"
              : ""
          }`}
        >
          <i className="bi bi-journal-text me-2" /> Teacher Attendance
        </Link>

        <Link
          to="/principal/dashboard/TeacherProfile"
          className={`s-link ${
            location.pathname.includes("/principal/dashboard/TeacherProfile")
              ? "active"
              : ""
          }`}
        >
          <i className="bi bi-journal-bookmark me-2" /> Teacher Profile
        </Link>

        <Link
          to="/principal/dashboard/PaperSetter"
          className={`s-link ${
            location.pathname.includes("/principal/dashboard/PaperSetter")
              ? "active"
              : ""
          }`}
        >
          <i className="bi bi-journal-text me-2" /> Paper Setters
        </Link>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1">
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
                    <strong>{principalName}</strong>
                    <br />
                    <small>{user?.mobile}</small>
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

        <div className="content p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
