import { useState } from "react";
import "./TeacherAttendance.css";

const teachers = [
  "NAVEEN (Phy)",
  "PHANI (Maths)",
  "SNB (Chem)",
  "SKR (Maths)",
  "NAGARAJU (Phy)",
  "MURALI (Phy)",
  "NARESH (Maths)",
  "MEERAVALI (Chem)",
  "MANI KIRAN (Maths)",
  "SRINIVASA (Phy)",
  "SRAVAN (Phy)",
  "BHARADAJ (Maths)",
  "VIJAYRAM (Chem)",
  "V SRNINIVAS (Maths)",
  "SWAMI (Chem)",
];

const leaveSummary = [
  { color: "bg-success", label: "Total Attendance", count: 21 },
  { color: "bg-purple", label: "Casual Leave", count: 0 },
  { color: "bg-danger", label: "Sick Leave", count: 2 },
  { color: "bg-warning", label: "Paid Leave", count: 1 },
  { color: "bg-primary", label: "Holidays", count: 1 },
];

const attendanceMap = {
  "2025-06-07": "bg-danger",
  "2025-06-08": "bg-danger",
  "2025-06-17": "bg-warning",
  "2025-06-20": "bg-primary",
};

const TeacherAttendanceSravan = () => {
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

  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and total days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const weeks = [];
  let day = 1 - (firstDay === 0 ? 6 : firstDay - 1); // Align Monday to start

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (day > 0 && day <= daysInMonth) {
        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")}`;
        week.push({ day, className: attendanceMap[dateKey] || "" });
      } else {
        week.push({ day: "", className: "" }); // Empty cell
      }
      day++;
    }
    weeks.push(week);
  }

  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);

  return (
    <div>
      {/* Header */}
      <div className="container-fluid p-2 teacher-attendance">
        <div className="d-flex justify-content-center align-items-start">
          <h5 className="fw-bold text-primary">Teacher Attendance</h5>
        </div>

        <div className="row mt-4">
          {/* Teacher List */}
          <div className="container-fluid p-4 d-flex flex-wrap justify-content-center gap-5 mt-3">
            <div className="col-md-2 overflow-auto p-1 mt-3 teacher-list">
              {teachers.map((name, idx) => (
                <button
                  key={idx}
                  className={`btn w-100 mb-2 ${
                    name === selectedTeacher
                      ? "btn-primary text-white"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => setSelectedTeacher(name)}
                >
                  {name}
                </button>
              ))}

              {/* {teachers.map((name, idx) => (
                                <button
                                    key={idx}
                                    className={`btn w-100 mb-2 ${idx === 0 ? 'btn-primary text-white' : 'btn-outline-primary'}`}
                                >
                                    {name}
                                </button>
                            ))} */}
            </div>

            {/* Calendar */}
            <div className="col-md-6">
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 mb-3 text-center">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handlePrevMonth}
                >
                  &laquo; Previews Month
                </button>
                <button className="btn btn-primary text-white px-4">
                  {monthNames[currentMonth]} {currentYear}
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleNextMonth}
                >
                  Next Month &raquo;
                </button>
              </div>

              <div className="calendar p-3 rounded border border-shadow">
                <div className="row text-center fw-bold mb-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <div className="col" key={day}>
                        {day}
                      </div>
                    )
                  )}
                </div>

                {weeks.map((week, i) => (
                  <div className="row text-center mb-2" key={i}>
                    {week.map((cell, j) => (
                      <div className="col" key={j}>
                        <div className={`day-box ${cell.className}`}>
                          {cell.day}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Leave Summary */}
            <div className="col-md-2 text-center">
              <div className="d-flex align-items-center mb-5">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  width="35"
                />
                <span
                  className="text-danger fw-bold ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      `/principal/dashboard/teacher/${teacherName}/profile`
                    )
                  }
                >
                  View Profile
                </span>{" "}
              </div>
              <div className="leave-summary p-3 rounded bg-light-pink">
                <h6 className="fw-bold text-primary">Leave Summary</h6>
                {leaveSummary.map((item, i) => (
                  <div key={i} className="d-flex align-items-center my-2">
                    <div className={`me-2 color-box ${item.color}`}></div>
                    <span>
                      {item.label} :{" "}
                      {item.count < 10 ? "0" + item.count : item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendanceSravan;
