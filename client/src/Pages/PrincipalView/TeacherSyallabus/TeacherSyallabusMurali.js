import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import "./TeacherSyallabusMurali.css";

const data = [
  { topic: "Light – Reflection", completed: 100, date: "15 Jan" },
  { topic: "The Human Eye", completed: 100, date: "22 Jan" },
  { topic: "Electricity", completed: 75, date: "5 Feb" },
  { topic: "Magnetism", completed: 50, date: "20 Feb" },
  { topic: "Sources of Energy", completed: 25, date: "1 Mar" },
];

const COLORS = ["#28a745", "#17a2b8", "#ffc107", "#fd7e14", "#dc3545"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { completed, date } = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow-sm">
        <strong>{label}</strong>
        <p className="m-0">Completed: {completed}%</p>
        <p className="m-0">Date: {date}</p>
      </div>
    );
  }
  return null;
};

const TeacherSyallabusMurali = () => {
  return (
    <div>
      <div
        className="container p-4 teacher-dashboard"
        style={{ minHeight: "100vh" }}
      >
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
              <h4 className="mb-0">SRAVAN (Physics)</h4>
              <p className="attended">
                Attended <strong>03/26/2025</strong>
              </p>
            </div>
          </div>
          <div>
            <div className="bg-white text-center rounded p-2">
              <div className="fw-bold">Mon</div>
              <div className="text-muted">20-04-25</div>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <div className="bg-white text-dark p-3 rounded">
              <h6 className="text-center bg-light p-2 rounded">
                Ongoing Syllabus
              </h6>
              <div
                className="p-2"
                style={{ backgroundColor: "#f8d7da", borderRadius: "8px" }}
              >
                <strong>Refraction of light at plane surfaces</strong>{" "}
                <span className="float-end">20-03-25</span>
                <ul className="mt-2">
                  <li>
                    Definition of Refraction
                    <small className="text-muted">completed</small>{" "}
                    <span className="float-end text-muted">31-03-25</span>
                  </li>
                  <li>
                    Snell's Law <small className="text-muted">ongoing</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="bg-white text-dark p-3 rounded">
              <h6 className="text-center bg-light p-2 rounded">
                Upcoming Syllabus
              </h6>
              <div className="scroll-box">
                <table className="table table-sm table-bordered mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Topic</th>
                      <th>Start</th>
                      <th>End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 14 }).map((_, index) => (
                      <tr key={index}>
                        <td>Gravitation</td>
                        <td>05-12-24</td>
                        <td>10-01-25</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* completed syllabus div */}

        <div className="d-flex justify-content-between row gap-1 border rounded-4 mt-4 p-4 bg-info opacity-20">
          <h5 className="text-left  p-2 rounded">Completed Syllabus</h5>
          <div className="col-5 bg-white p-4 rounded mt-4">
            <h5 className="text-center mb-4">
              Syllabus Completion Progress – Class 10 (Physics)
            </h5>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="topic"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={70}
                />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="completed" barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <LabelList
                    dataKey="completed"
                    position="top"
                    formatter={(value) => `${value}%`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-6 bg-white text-dark p-3 rounded mt-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                1. Light – Reflection and Refraction
              </li>
              <li className="list-group-item">
                2. The Human Eye and the Colourful World
              </li>
              <li className="list-group-item">3. Electricity</li>
              <li className="list-group-item">
                4. Magnetic Effects of Electric Current
              </li>
              <li className="list-group-item">5. Sources of Energy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSyallabusMurali;
