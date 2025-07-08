// src/Pages/TeacherAllottedClasses/TeacherAllottedClasses.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./AllottedClasses.css";
import { useAuth } from "../../../context/AuthContext";

/* -------- demo data ------------------------------------------------- */
const classes = [
  { name: "10 A", time: "9:00 AM" },
  { name: "10 B", time: "10:00 AM" },
  { name: "9 A", time: "11:00 AM" },
  { name: "9 B", time: "12:00 PM" },
  { name: "8 A", time: "1:00 PM" },
  { name: "8 B", time: "2:00 PM" },
];
/* -------------------------------------------------------------------- */

export default function AllottedClasses() {
  const { user } = useAuth(); // ← logged-in teacher
  const { teacherName: urlTeacher } = useParams();
  const teacherName = user?.name || urlTeacher || "Teacher";

  const navigate = useNavigate();
  const [selDate, setSelDate] = useState(new Date());
  const [openCal, setOpenCal] = useState(false);

  const formattedDate = format(selDate, "dd-MM-yy");
  const dayName = format(selDate, "EEE");

  return (
    <Container className="paper-setter-page mt-4 mb-4">
      {/* ---------- Header ------------------------------------------------ */}
      <div className="d-flex justify-content-between mb-4 flex-wrap gap-3">
        <div className="d-flex gap-3 align-items-center">
          <img
            src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
            alt="avatar"
            className="rounded-circle bg-light"
            style={{ width: 90 }}
          />
          <div>
            <h5 className="title text-danger mb-1">PAPER SETTER TEAM</h5>
            <h4 className="mb-0">{teacherName}</h4>
            {/* replace with real data if available */}
            <p className="mb-0 attended">
              Attended <strong>{formattedDate}</strong>
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center position-relative gap-2">
          <span className="fw-bold">{formattedDate}</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
            alt="calendar"
            width={28}
            style={{ cursor: "pointer" }}
            onClick={() => setOpenCal((o) => !o)}
          />
          <div className="bg-light rounded fw-bold">{dayName}</div>

          {openCal && (
            <div
              className="position-absolute"
              style={{ top: 70, zIndex: 10, left: 60 }}
            >
              <DatePicker
                inline
                selected={selDate}
                onChange={(d) => {
                  setSelDate(d);
                  setOpenCal(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ---------- Allotted classes list ---------------------------------- */}
      <h5 className="mb-3">Allotted Classes</h5>

      {classes.map((item) => (
        <Card key={item.name} className="class-card p-3 pb-0 mb-3">
          <Row className="align-items-center justify-content-between">
            <Col xs={4}>
              <h6 className="class-name mb-1">{item.name}</h6>
              <p className="class-time mb-0">{item.time}</p>
            </Col>
            <Col xs={4} className="text-end">
              <Button
                variant="outline-primary"
                onClick={() =>
                  navigate(
                    `/teacher/syllabus?class=${encodeURIComponent(item.name)}`
                  )
                }
              >
                View Syllabus
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
}
