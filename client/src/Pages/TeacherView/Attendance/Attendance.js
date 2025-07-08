import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // ✅ AUTH
import "./Attendance.css";
import "bootstrap/dist/css/bootstrap.min.css";

const attendanceDB = {
  Naveen: {
    "2025-06-01": "present",
    "2025-06-03": "present",
    "2025-06-05": "sick",
    "2025-06-10": "casual",
    "2025-06-14": "present",
    "2025-06-18": "holiday",
    "2025-06-22": "paid",
    "2025-06-26": "present",
  },
};

function makeDemoMonth(year, month) {
  const choices = [
    "present",
    "present",
    "present", // bias toward present
    "sick",
    "casual",
    "paid",
    "holiday",
  ];
  const days = new Date(year, month + 1, 0).getDate();
  const out = {};
  for (let d = 1; d <= days; d++) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      d
    ).padStart(2, "0")}`;
    out[key] = choices[Math.floor(Math.random() * choices.length)];
  }
  return out;
}

/* Status → color class */
const statusColor = {
  present: "bg-success",
  casual: "bg-purple",
  sick: "bg-danger",
  paid: "bg-warning",
  holiday: "bg-primary",
};

/* Main Component */
export default function Attendance() {
  const { teacherName: teacherNameFromUrl } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isTeacher = user?.role === "teacher";
  const isPrincipal = user?.role === "principal";

  // Determine whose attendance to show
  const teacherName = isTeacher ? user.name : teacherNameFromUrl;

  // Redirect principal to first teacher if no name in URL
  useEffect(() => {
    if (isPrincipal && !teacherNameFromUrl) {
      const defaultName = Object.keys(attendanceDB)[0];
      navigate(`/teacher/${defaultName}/attendance`, { replace: true });
    }
  }, [isPrincipal, teacherNameFromUrl, navigate]);

  const [attendanceMaps, setAttendanceMaps] = useState({}); // { "2025-07": { ... }, "2025-06": {...} }

  useEffect(() => {
    const monthsToPreload = [0, 1, 2, 3, 4, 5]; // April, May, June
    const y = 2025;
    monthsToPreload.forEach((m) => {
      const key = `${teacherName}-${y}-${String(m + 1).padStart(2, "0")}`;
      if (!attendanceMaps[key]) {
        const monthData = makeDemoMonth(y, m);
        setAttendanceMaps((prev) => ({
          ...prev,
          [key]: monthData,
        }));
      }
    });
  }, [teacherName]);

  /* Calendar helpers */
  const [viewMonth, setViewMonth] = useState(new Date());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentKey = `${teacherName}-${viewMonth.getFullYear()}-${String(
    viewMonth.getMonth() + 1
  ).padStart(2, "0")}`;
  const attendanceMap = attendanceMaps[currentKey] || {};
  const m = viewMonth.getMonth();
  const y = viewMonth.getFullYear();
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const summary = useMemo(() => {
    const c = { present: 0, casual: 0, sick: 0, paid: 0, holiday: 0 };
    Object.values(attendanceMap).forEach((st) => (c[st] += 1));
    return [
      { label: "Total Present", color: "bg-success", count: c.present },
      { label: "Casual Leave", color: "bg-purple", count: c.casual },
      { label: "Sick Leave", color: "bg-danger", count: c.sick },
      { label: "Paid Leave", color: "bg-warning", count: c.paid },
      { label: "Holidays", color: "bg-primary", count: c.holiday },
    ];
  }, [attendanceMap]);

  const weeks = [];
  let d = 1 - (firstDay === 0 ? 6 : firstDay - 1);
  for (let row = 0; row < 6; row++) {
    const w = [];
    for (let col = 0; col < 7; col++) {
      if (d > 0 && d <= daysInMonth) {
        const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(
          d
        ).padStart(2, "0")}`;
        w.push({ day: d, className: statusColor[attendanceMap[key]] || "" });
      } else {
        w.push({ day: "", className: "" });
      }
      d++;
    }
    weeks.push(w);
  }

  return (
    <div className="teacher-attendance container-fluid py-4">
      <h5 className="fw-bold text-primary text-uppercase text-center my-4 pb-3">
        {teacherName} – Attendance
      </h5>

      <div className="row justify-content-center gap-5">
        {/* ========== CALENDAR ========== */}
        <div className={isPrincipal ? "col-md-7" : "col-md-8"}>
          <div className="d-flex justify-content-center gap-3 mb-4 pb-2">
            <button
              className="btn btn-outline-secondary btn-sm px-4"
              onClick={() =>
                setViewMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1))
              }
            >
              &laquo; Previous
            </button>
            <button className="btn btn-primary text-white px-4">
              {monthNames[m]} {y}
            </button>
            <button
              className="btn btn-outline-secondary btn-sm px-4"
              onClick={() =>
                setViewMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1))
              }
            >
              Next &raquo;
            </button>
          </div>

          <div className="calendar p-2 rounded border">
            <div className="row text-center fw-bold my-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div className="col" key={d}>
                  {d}
                </div>
              ))}
            </div>
            {weeks.map((week, i) => (
              <div className="row text-center mb-4" key={i}>
                {week.map((cell, j) => (
                  <div className="col" key={j} style={{ marginLeft: "40px" }}>
                    <div className={`day-box ${cell.className}`}>
                      {cell.day}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ========== SUMMARY ========== */}
        <div className="col-md-3 text-center mt-4">
          <div className="leave-summary p-3 rounded border">
            <h6 className="fw-bold text-primary py-3">Leave Summary</h6>
            {summary.map((s) => (
              <div key={s.label} className="d-flex align-items-center my-2">
                <div className={`me-3 color-box ${s.color}`} />
                <span>
                  {s.label} : {String(s.count).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
