import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TeacherAttendance.css";
import "bootstrap/dist/css/bootstrap.min.css";

const teacherLabels = [
  ["NAVEEN (Phy)", "Naveen"],
  ["MURALI (Maths)", "Murali"],
  ["SRAVAN (Chem)", "Sravan"],
  ["PHANI (Phy)", "Phani"],
  ["SNB (Chem)", "SNB"],
  ["SKR (Maths)", "SKR"],
  ["NAGARAJU (Phy)", "Nagaraju"],
  ["NARESH (Maths)", "Naresh"],
  ["MEERAVALI (Chem)", "Meeravali"],
  ["MANI KIRAN (Maths)", "ManiKiran"],
  ["SRINIVASA (Phy)", "Srinivasa"],
  ["BHARADAJ (Maths)", "Bharadaj"],
  ["VIJAYRAM (Chem)", "Vijayram"],
  ["V SRNINIVAS (Maths)", "VSrinivasa"],
  ["SWAMI (Chem)", "Swami"],
];

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
  Murali: {
    "2025-06-02": "present",
    "2025-06-04": "present",
    "2025-06-07": "sick",
    "2025-06-10": "casual",
    "2025-06-12": "present",
    "2025-06-15": "paid",
    "2025-06-18": "holiday",
    "2025-06-20": "present",
  },
  Sravan: {
    "2025-06-03": "present",
    "2025-06-06": "sick",
    "2025-06-09": "casual",
    "2025-06-15": "paid",
    "2025-06-20": "holiday",
    "2025-06-25": "present",
    "2025-06-28": "present",
  },
  Phani: {
    "2025-06-04": "present",
    "2025-06-07": "sick",
    "2025-06-10": "casual",
    "2025-06-15": "paid",
    "2025-06-20": "holiday",
    "2025-06-22": "present",
    "2025-06-25": "present",
  },
};

const statusColor = {
  present: "bg-success",
  casual: "bg-purple",
  sick: "bg-danger",
  paid: "bg-warning",
  holiday: "bg-primary",
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

export default function TeacherAttendance() {
  const { teacherName } = useParams(); // Naveen, Murali, …
  const navigate = useNavigate();
  const [viewMonth, setViewMonth] = useState(new Date());
  const [attendanceMaps, setAttendanceMaps] = useState({});

  /* Redirect to first teacher if none in URL */
  useEffect(() => {
    if (!teacherName) {
      navigate(
        `/principal/dashboard/teacher/${teacherLabels[0][1]}/attendance`,
        { replace: true }
      );
    }
  }, [teacherName, navigate]);

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

  const m = viewMonth.getMonth();
  const y = viewMonth.getFullYear();

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

  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  /* Build weeks matrix */
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

  /* -------- RENDER -------- */
  return (
    <div className="teacher-attendance container-fluid py-4">
      <h5 className="fw-bold text-primary text-uppercase text-center my-4 pb-3">
        {teacherName} – Attendance
      </h5>

      <div className="row justify-content-center gap-5">
        {/* Teacher list */}
        <div className="col-md-2 overflow-auto p-1 mt-3 teacher-list">
          {teacherLabels.map(([label, key]) => (
            <button
              key={key}
              className={`btn w-100 mb-2 ${
                key === teacherName
                  ? "btn-primary text-white"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                navigate(`/principal/dashboard/teacher/${key}/attendance`)
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Calendar */}
        <div className="col-md-6">
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

        {/* Leave summary */}
        <div className="col-md-2 text-center">
          <div className="d-flex align-items-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              width="35"
              alt=""
            />
            <span
              className="text-danger fw-bold ms-2"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/principal/dashboard/teacher/${teacherName}/profile`)
              }
            >
              View Profile
            </span>
          </div>
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
