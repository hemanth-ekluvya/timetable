import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrincipalLayout.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const navigate = useNavigate();

  const data = [
    {
      title: "IIT",
      rows: [
        [
          ["10 A", "10 B", "10 C"],
          ["9 A", "9 B", "9 C"],
          ["8 A", "8 B", "8 C"],
        ],
      ],
    },
    {
      title: "CBSE",
      rows: [
        [
          ["10 A", "10 B", "10 C"],
          ["9 A", "9 B", "9 C"],
          ["8 A", "8 B", "8 C"],
        ],
      ],
    },
  ];

  const toTimetablePath = (course, classLabel) => {
    const compact = classLabel.replace(/\s+/g, ""); // "10 A" -> "10A"
    const prefix =
      course === "IIT" ? "IITClassTimeTable" : "CBSEClassTimeTable";
    const page =
      course === "IIT"
        ? `ClassTimeTable${compact}` 
        : `ClassTimetable${compact}`; 

    return `/principal/dashboard/${prefix}/${page}`;
  };

  const renderSection = (section) => (
    <div key={section.title} className="mb-5">
      <div className="btn btn-primary text-white px-4 py-2 rounded mb-4 d-inline-block fw-bold">
        {section.title}
      </div>

      <div className="d-flex flex-wrap gap-4">
        {section.rows.flat().map((classGroup, idx) => (
          <div key={idx} className="d-flex gap-2 flex-wrap rounded p-2">
            {classGroup.map((cls, i) => (
              <button
                key={i}
                className="btn btn-outline-primary"
                style={{
                  width: "100px",
                  borderRadius: "10px",
                  margin: "5px",
                  padding: "10px",
                  fontSize: "16px",
                  height: "50px",
                }}
                onClick={() => navigate(toTimetablePath(section.title, cls))}
              >
                {cls}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="homepage container-fluid my-4">
      {data.map((section) => renderSection(section))}
    </div>
  );
};

export default HomePage;
