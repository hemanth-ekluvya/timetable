import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TeacherProfileSravan.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const teacherKeys = [
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
  Sravan: {
    fullName: "Sravan (Physics)",
    subject: "Physics",
    phone: "9012345678",
    email: "sravan@school.com",
    attended: "26/03/2025",
  },
  Murali: {
    fullName: "Murali (Maths)",
    subject: "Mathematics",
    phone: "7890123456",
    email: "murali@school.com",
    attended: "26/03/2025",
  },
};

const timeTableData = [
  {
    subject: "Refraction of light at plane....",
    class: "9 B",
    time: "8 AM",
    status: "Completed",
  },
  {
    subject: "Refraction of light at plane....",
    class: "9 A",
    time: "9:00 AM",
    status: "Ongoing",
  },
  { subject: "Sound", class: "8 A", time: "10:00 AM", status: "Upcoming" },
  { subject: "Force", class: "9 C", time: "11:00 AM", status: "Upcoming" },
  { subject: "Force", class: "9 C", time: "11:00 AM", status: "Upcoming" },
  {
    subject: "Topic Name...",
    class: "8 C",
    time: "11:00 AM",
    status: "Upcoming",
  },
  {
    subject: "Topic Name...",
    class: "8 C",
    time: "11:00 AM",
    status: "Upcoming",
  },
];

const TeacherProfileSravan = () => {
  const { teacherName } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(teacherName || teacherKeys[0]);

  useEffect(() => {
    if (teacherName && teacherName !== selected) setSelected(teacherName);
  }, [teacherName, selected]);

  const [datepickerOpen, setDatepickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, "dd-MM-yy");
  const dayName = format(selectedDate, "EEE");

  const prof = profileDB[selected];

  return (
    <Container fluid className="py-4">
      <h5 className="fw-bold text-primary text-center mb-4">
        {selected} – Profile
      </h5>

      <Row className="justify-content-center gap-5">
        <Col md={2} className="overflow-auto p-1 teacher-list">
          {teacherKeys.map(({ label, key }) => (
            <button
              key={key}
              className={`btn w-100 mb-2 ${
                key === selected
                  ? "btn-primary text-white"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                navigate(`/principal/dashboard/teacher/${key}/profile`)
              }
            >
              {label}
            </button>
          ))}
        </Col>

        <Col md={8}>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div className="d-flex gap-3">
              <img
                src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
                alt="profile"
                className="rounded-circle bg-light"
                style={{ width: "90px" }}
              />
              <div>
                <h4 className="mb-1">{prof ? prof.fullName : selected}</h4>
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

            <div className="d-flex align-items-center position-relative gap-2">
              <span className="fw-bold">{formattedDate}</span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
                alt="calendar"
                width="28"
                style={{ cursor: "pointer" }}
                onClick={() => setDatepickerOpen((o) => !o)}
              />
              <div className="bg-light px-2 rounded fw-bold">{dayName}</div>

              {datepickerOpen && (
                <div
                  className="position-absolute"
                  style={{ top: "40px", zIndex: 10 }}
                >
                  <DatePicker
                    inline
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setDatepickerOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <Button
            className="mb-4"
            onClick={() =>
              navigate(
                `/principal/dashboard/teacher/${selected}/allotted-classes`
              )
            }
          >
            View Allotted Classes
          </Button>

          <div className="timetable">
            <h5 className="mb-3">Today’s Timetable</h5>
            <Row>
              {timeTableData.map((item, idx) => (
                <Col md={6} lg={3} sm={12} key={idx} className="mb-3">
                  <Card className={`status-card ${item.status.toLowerCase()}`}>
                    <Card.Body>
                      <Card.Title>{item.subject}</Card.Title>
                      <p>
                        <strong>Class:</strong> {item.class}
                      </p>
                      <p>
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
};

export default TeacherProfileSravan;
