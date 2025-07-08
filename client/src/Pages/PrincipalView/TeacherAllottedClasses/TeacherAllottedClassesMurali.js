import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { format } from "date-fns";
import "./TeacherAllottedClassesMurali.css";

const TeacherAllottedClassesMurali = () => {
  const { teacherName } = useParams(); 
  const navigate = useNavigate();

  const classes = [
    { name: "9 B", time: "8:00 AM" },
    { name: "9 A", time: "9:00 AM" },
    { name: "8 A", time: "10:00 AM" },
    { name: "9 C", time: "11:00 PM" },
    { name: "9 C", time: "12:00 PM" },
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false); // Close after selection
  };

  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };

  const formattedDate = format(selectedDate, "dd-MM-yy");
  const dayName = format(selectedDate, "EEE");

  return (
    <div>
      <Container className="paper-setter-page mt-4 mb-4">
        <div className=" ">
          {/* Teacher Info */}
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="text-white text-center">
                <img
                  src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "100px" }}
                />
              </div>

              <div className="teacher-info mb-3">
                {/* <h5 className="title text-danger">PAPER SETTER TEAM</h5> */}
                <h4 className="mb-0">MURALI (Maths)</h4>
                <p className="attended">
                  Attended <strong></strong>
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3 position-relative gap-3">
              {/* Selected date */}
              <p className="mb-0 fw-bold">{formattedDate}</p>

              <div className="d-flex align-items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
                  alt="calendar"
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                  onClick={toggleCalendar}
                />

                {/* Day display */}
                <div className="bg-light px-2 rounded fw-bold">{dayName}</div>
              </div>

              {/* Calendar Dropdown - absolute positioned below icon */}
              {isOpen && (
                <div
                  className="position-absolute"
                  style={{ top: "70px", left: "50px", zIndex: 10 }}
                >
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                  />
                </div>
              )}
            </div>
          </div>

          {/* Allotted Classes */}
          <h5 className="mb-3">Allotted Classes</h5>
          {classes.map((item, index) => (
            <Card key={index} className="class-card p-3 mb-3">
              <Row className="align-items-center justify-content-between">
                <Col xs={4}>
                  <h6 className="class-name">{item.name}</h6>
                  <p className="class-time">{item.time}</p>
                </Col>
                <Col xs={4} className="text-end">
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      navigate(
                        `/principal/dashboard/teacher/${teacherName}/syallabus?class=${item.name}`
                      )
                    }
                  >
                    View Syllabus
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TeacherAllottedClassesMurali;
