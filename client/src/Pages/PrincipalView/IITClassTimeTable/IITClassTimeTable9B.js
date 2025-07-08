import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./IITClassTimeTable.css";
import { format } from "date-fns";

const IITClassTimeTable9B = () => {
  const navigate = useNavigate();
  const { courseClassTimeTable, page } = useParams();

  const course = courseClassTimeTable.includes("IIT") ? "IIT" : "CBSE";
  const match = page.match(/Class(?:TimeTable|Timetable)(\d+[A-Z])/);
  const className = match ? match[1] : "";

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };

  const formattedDate = format(selectedDate, "dd-MM-yy");
  const dayName = format(selectedDate, "EEE");
  const todayClasses = [
    {
      class: "Class_1",
      subject: "Maths",
      teacher: "BHARADWAJ",
      topic: "Triangles …..",
      time: "10:00 AM",
      start: "10:00 AM",
      end: "11:50 AM",
    },
    {
      class: "Class_2",
      subject: "Physics",
      teacher: "SRAVAN",
      topic: "Gravitation…..",
      time: "8:00 AM",
      start: "8:00 AM",
      end: "9:50 AM",
    },
    {
      class: "Class_3",
      subject: "Chemistry",
      teacher: "SWAMI",
      topic: " Atoms and Molecules…..",
      time: "12:00 PM",
      start: "12:00 PM",
      end: "12:50 PM",
    },
    { break: true },
    {
      class: "Class_4",
      subject: "Maths",
      teacher: "V SRINIVAS",
      topic: "Number System …..",
      time: "2:00 PM",
      start: "2:00 PM",
      end: "2:50 PM",
    },
    {
      class: "Class_5",
      subject: "Chemistry",
      teacher: "VIJAYRAM",
      topic: " Atoms and Molecules…..",
      time: "2:00 PM",
      start: "2:00 PM",
      end: "2:50 PM",
    },
  ];

  const weekendTests = [
    {
      test: "Test_1",
      subject: "Maths",
      teacher: "PHANI",
      time: "9:00 AM",
      start: "9:00 AM",
      end: "12:00 AM",
    },
    {
      test: "Test_2",
      subject: "Physics",
      teacher: "NAVEEN",
      time: "1:00 AM",
      start: "1:00 PM",
      end: "3:00 PM",
    },
    {
      test: "Test_3",
      subject: "Chemistry",
      teacher: "SNB",
      time: "3:30 AM",
      start: "3:30 PM",
      end: "5:30 PM",
    },
  ];

  return (
    <div className="class-time-table container-fluid my-4">
      {/* Back Button */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      {/* Top Row: Title & Breadcrumb */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 style={{ color: "#0056b3" }}>
          {course} <span className="text-primary"> &gt; {className}</span>
        </h5>
      </div>

      {/* Date Picker Row */}
      <div className="d-flex align-items-center mb-3 position-relative gap-3">
        <p className="mb-0 fw-bold">{formattedDate}</p>
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
            alt="calendar"
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={toggleCalendar}
          />
          <div className="bg-light px-2 rounded fw-bold">{dayName}</div>
        </div>
        {isOpen && (
          <div
            className="position-absolute"
            style={{ top: "40px", left: "100px", zIndex: 10 }}
          >
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
            />
          </div>
        )}
      </div>

      <div className="mb-3" style={{ paddingLeft: "450px" }}>
        <button className="btn btn-primary fw-bold">Today Time Table</button>
      </div>

      <div className="row">
        <div
          className="col-md-8"
          style={{
            backgroundColor: "#f0f6ff",
            borderRadius: "16px",
            padding: "20px",
            maxHeight: "620px",
            overflowY: "auto",
          }}
        >
          {todayClasses.map((item, index) =>
            item.break ? (
              <div
                key={index}
                className="text-white text-center fw-bold py-2 rounded my-3"
                style={{
                  backgroundColor: "#0B5ED7",
                  fontSize: "18px",
                  width: "50%",
                  margin: "0 auto",
                }}
              >
                Lunch Break 1:00 PM – 2:00 PM
              </div>
            ) : (
              <div
                key={index}
                className="card mb-3 shadow-sm border border-primary"
              >
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between mb-1">
                    <strong>{item.class}</strong>
                    <small>{item.time}</small>
                  </div>
                  <div className="fw-bold text-primary">{item.subject}</div>
                  <div className="text-muted">{item.teacher}</div>
                  <div className="text-secondary small">{item.topic}</div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="text-muted small">Room No. 05</span>
                    <span>
                      <button className="btn btn-primary btn-sm mx-1">
                        {item.start}
                      </button>
                      to
                      <button className="btn btn-primary btn-sm mx-1">
                        {item.end}
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Weekend Tests */}
        <div className="col-md-4 ps-4">
          <h6
            className="text-danger fw-bold mb-4"
            style={{ fontSize: "16px", paddingLeft: "150px" }}
          >
            Weekend Test schedule
          </h6>
          {weekendTests.map((test, idx) => (
            <div key={idx} className="card border-primary mb-3 shadow-sm">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between mb-1">
                  <strong>{test.test}</strong>
                  <small>{test.time}</small>
                </div>
                <div className="fw-bold text-primary">{test.subject}</div>
                <div className="text-muted">{test.teacher}</div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="text-muted small">Room No. 05</span>
                  <span>
                    <button className="btn btn-primary btn-sm mx-1">
                      {test.start}
                    </button>
                    to
                    <button className="btn btn-primary btn-sm mx-1">
                      {test.end}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IITClassTimeTable9B;
