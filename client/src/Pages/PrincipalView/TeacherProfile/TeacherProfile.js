import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TeacherProfile.css";

const teachers = [
  { label: "NAVEEN (Phy)", key: "Naveen" },
  { label: "MURALI (Maths)", key: "Murali" },
  { label: "SRAVAN (Chem)", key: "Sravan" },
  { label: "PHANI (Phy)", key: "Phani" },
  { label: "SNB (Chem)", key: "SNB" },
  { label: "SKR (Maths)", key: "SKR" },
  { label: "NAGARAJU (Phy)", key: "Nagaraju" },
  { label: "NARESH (Maths)", key: "Naresh" },
  { label: "MEERAVALI (Chem)", key: "Meeravali" },
  { label: "MANI KIRAN (Maths)", key: "ManiKiran" },
  { label: "SRINIVASA (Phy)", key: "Srinivasa" },
  { label: "BHARADAJ (Maths)", key: "Bharadaj" },
  { label: "VIJAYRAM (Chem)", key: "Vijayram" },
  { label: "V SRNINIVAS (Maths)", key: "VSrinivasa" },
  { label: "SWAMI (Chem)", key: "Swami" },
];

const profileDB = {
  Naveen: {
    fullName: "Naveen (Physics)",
    subject: "Physics",
    phone: "9876543210",
    email: "naveen@school.com",
    attended: "19/06/2025",
  },
  Murali: {
    fullName: "Murali (Maths)",
    subject: "Mathematics",
    phone: "7890123456",
    email: "murali@school.com",
    attended: "20/06/2025",
  },
  Sravan: {
    fullName: "Sravan (Chemistry)",
    subject: "Chemistry",
    phone: "9012345678",
    email: "sravan@school.com",
    attended: "18/06/2025",
  },
  Phani: {
    fullName: "Phani (Physics)",
    subject: "Physics",
    phone: "9123456780",
    email: "phani@school.com",
    attended: "17/06/2025",
  },
  SNB: {
    fullName: "SNB (Chemistry)",
    subject: "Chemistry",
    phone: "9234567890",
    email: "snb@school.com",
    attended: "16/06/2025",
  },
  SKR: {
    fullName: "SKR (Mathematics)",
    subject: "Mathematics",
    phone: "9345678901",
    email: "skr@school.com",
    attended: "15/06/2025",
  },
};

/* demo timetable */
const timeTableData = [
  {
    subject: "Force and Newton’s laws",
    class: "10 B",
    time: "8 AM",
    status: "Completed",
  },
  { subject: "Electricity", class: "9 A", time: "9 AM", status: "Ongoing" },
  { subject: "Electricity", class: "9 C", time: "10 AM", status: "Upcoming" },
];

export default function TeacherProfile() {
  const { teacherName } = useParams(); // URL param “Naveen”, “Murali”, …
  const navigate = useNavigate();

  /* state mirrors the route for instant UI feedback */
  const [selectedKey, setSelectedKey] = useState(
    teacherName || teachers[0].key
  );

  /* keep state synced if URL changes externally */
  useEffect(() => {
    if (teacherName && teacherName !== selectedKey) setSelectedKey(teacherName);
  }, [teacherName, selectedKey]);

  /* calendar */
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, "dd-MM-yy");
  const dayName = format(selectedDate, "EEE");

  const prof = profileDB[selectedKey];

  return (
    <Container fluid className="py-4">
      <h5 className="fw-bold text-primary text-center mb-4">
        {prof ? prof.fullName : selectedKey} – Profile
      </h5>

      <Row className="justify-content-center gap-5">
        {/* -------- Teacher List -------- */}
        <Col md={2} className="overflow-auto p-1 teacher-list">
          {teachers.map((t) => (
            <button
              key={t.key}
              className={`btn w-100 mb-2 ${
                t.key === selectedKey
                  ? "btn-primary text-white"
                  : "btn-outline-primary"
              }`}
              onClick={() => navigate(`/principal/dashboard/teacher/${t.key}/profile`)}
            >
              {t.label}
            </button>
          ))}
        </Col>

        {/* -------- Profile + timetable -------- */}
        <Col md={8}>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            {/* avatar & basics */}
            <div className="d-flex gap-3">
              <img
                src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
                alt="profile"
                className="rounded-circle bg-light"
                style={{ width: "90px" }}
              />
              <div>
                <h4 className="mb-1">{prof ? prof.fullName : selectedKey}</h4>
                {prof ? (
                  <>
                    <p className="mb-0">
                      <strong>Subject:</strong> {prof.subject}
                    </p>
                    <p className="mb-0 attended">
                      Attended <strong>{prof.attended}</strong>
                    </p>
                  </>
                ) : (
                  <p className="text-muted mb-0">Data not available</p>
                )}
              </div>
            </div>

            {/* date picker */}
            <div className="d-flex align-items-center position-relative gap-2">
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
          </div>

          <Button
            className="mb-4"
            onClick={() => navigate(`/principal/dashboard/teacher/${selectedKey}/allotted-classes`)}
          >
            View Allotted Classes
          </Button>

          {/* timetable */}
          <div className="timetable">
            <h5 className="mb-3">Today’s Timetable</h5>
            <Row>
              {timeTableData.map((item, idx) => (
                <Col md={6} lg={3} sm={12} className="mb-3" key={idx}>
                  <Card className={`status-card ${item.status.toLowerCase()}`}>
                    <Card.Body>
                      <Card.Title>{item.subject}</Card.Title>
                      <p className="mb-1">
                        <strong>Class:</strong> {item.class}
                      </p>
                      <p className="mb-1">
                        <strong>Time:</strong> {item.time}
                      </p>
                      <span className="badge status-badge">{item.status}</span>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
