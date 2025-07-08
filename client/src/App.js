import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import HomeBanner from "./Components/HomeBanner/HomeBanner";
import HomePage from "./Components/layout/PrincipalLayout/PrincipalLayout";
import PaperSetter from "./Pages/PrincipalView/PaperSetter/PaperSetter";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import RequireRoles from "./utils/RequireRoles";
import TeacherLayout from "./Components/layout/TeacherLayout/TeacherLayout";
import StudentLayout from "./Components/layout/StudentLayout/StudentLayout";
import Attendance from "./Pages/TeacherView/Attendance/Attendance";
import Syallabus from "./Pages/TeacherView/Syallabus/Syallabus";
import AllottedClasses from "./Pages/TeacherView/AllottedClasses/AllottedClasses";

const teacherPages = {
  Murali: {
    Syallabus: lazy(() =>
      import("./Pages/PrincipalView/TeacherSyallabus/TeacherSyallabusMurali")
    ),
    Allotted: lazy(() =>
      import(
        "./Pages/PrincipalView/TeacherAllottedClasses/TeacherAllottedClassesMurali"
      )
    ),
    Profile: lazy(() =>
      import("./Pages/PrincipalView/TeacherProfile/TeacherProfileMurali")
    ),
  },
  Sravan: {
    Syallabus: lazy(() =>
      import("./Pages/PrincipalView/TeacherSyallabus/TeacherSyallabusSravan")
    ),
    Allotted: lazy(() =>
      import(
        "./Pages/PrincipalView/TeacherAllottedClasses/TeacherAllottedClassesSravan"
      )
    ),
    Profile: lazy(() =>
      import("./Pages/PrincipalView/TeacherProfile/TeacherProfileSravan")
    ),
  },
};

const GenericSyallabus = lazy(() =>
  import("./Pages/PrincipalView/TeacherSyallabus/TeacherSyallabus")
);
const GenericAllotted = lazy(() =>
  import("./Pages/PrincipalView/TeacherAllottedClasses/TeacherAllottedClasses")
);
const GenericProfile = lazy(() =>
  import("./Pages/PrincipalView/TeacherProfile/TeacherProfile")
);
const GenericAttendance = lazy(() =>
  import("./Pages/PrincipalView/TeacherAttendance/TeacherAttendance")
);

const timetablePages = {
  IIT: {
    ClassTimeTable10A: lazy(() =>
      import("./Pages/PrincipalView/IITClassTimeTable/IITClassTimeTable10A")
    ),
    ClassTimeTable10B: lazy(() =>
      import("./Pages/PrincipalView/IITClassTimeTable/IITClassTimeTable10B")
    ),
    ClassTimeTable10C: lazy(() =>
      import("./Pages/PrincipalView/IITClassTimeTable/IITClassTimeTable10C")
    ),
    ClassTimeTable9A: lazy(() =>
      import("./Pages/PrincipalView/IITClassTimeTable/IITClassTimeTable9A")
    ),
    ClassTimeTable9B: lazy(() =>
      import("./Pages/PrincipalView/IITClassTimeTable/IITClassTimeTable9B")
    ),
    ClassTimeTable9C: lazy(() =>
      import("./Pages/PrincipalView/IITClassTimeTable/IITClassTimeTable9C")
    ),
    ClassTimeTable8A: lazy(() =>
      import("./Pages/PrincipalView/IITClassTimeTable/IITClassTimeTable8A")
    ),
    ClassTimeTable8B: lazy(() =>
      import("./Pages/PrincipalView/IITClassTimeTable/IITClassTimeTable8B")
    ),
    ClassTimeTable8C: lazy(() =>
      import("./Pages/PrincipalView/IITClassTimeTable/IITClassTimeTable8C")
    ),
  },
  CBSE: {
    ClassTimetable10A: lazy(() =>
      import("./Pages/PrincipalView/CBSEClassTimeTable/CBSEClassTimeTable10A")
    ),
    ClassTimetable10B: lazy(() =>
      import("./Pages/PrincipalView/CBSEClassTimeTable/CBSEClassTimeTable10B")
    ),
    ClassTimetable10C: lazy(() =>
      import("./Pages/PrincipalView/CBSEClassTimeTable/CBSEClassTimeTable10C")
    ),
    ClassTimetable9A: lazy(() =>
      import("./Pages/PrincipalView/CBSEClassTimeTable/CBSEClassTimeTable9A")
    ),
    ClassTimetable9B: lazy(() =>
      import("./Pages/PrincipalView/CBSEClassTimeTable/CBSEClassTimeTable9B")
    ),
    ClassTimetable9C: lazy(() =>
      import("./Pages/PrincipalView/CBSEClassTimeTable/CBSEClassTimeTable9C")
    ),
    ClassTimetable8A: lazy(() =>
      import("./Pages/PrincipalView/CBSEClassTimeTable/CBSEClassTimeTable8A")
    ),
    ClassTimetable8B: lazy(() =>
      import("./Pages/PrincipalView/CBSEClassTimeTable/CBSEClassTimeTable8B")
    ),
    ClassTimetable8C: lazy(() =>
      import("./Pages/PrincipalView/CBSEClassTimeTable/CBSEClassTimeTable8C")
    ),
  },
};

function TimetableLoader() {
  const { courseClassTimeTable, page } = useParams();
  const course = courseClassTimeTable?.startsWith("IIT")
    ? "IIT"
    : courseClassTimeTable?.startsWith("CBSE")
    ? "CBSE"
    : null;

  const PageComp = course ? timetablePages[course]?.[page] : null;
  if (!PageComp) return <h1>Timetable Not Found</h1>;

  return (
    <Suspense fallback={<p className="m-4">Loading timetable…</p>}>
      <PageComp />
    </Suspense>
  );
}

function TeacherPageLoader({ pageType }) {
  const { teacherName } = useParams();
  const CustomComp = teacherPages[teacherName]?.[pageType];

  const fallback = {
    Syallabus: GenericSyallabus,
    Allotted: GenericAllotted,
    Profile: GenericProfile,
    Attendance: GenericAttendance,
  }[pageType];

  const Comp = CustomComp || fallback;

  return (
    <Suspense fallback={<p className="m-4">Loading {pageType}…</p>}>
      <Comp />
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/principal/dashboard"
          element={
            <ProtectedRoute allowedRoles={["principal"]}>
              <HomeBanner />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />

          <Route
            path="/principal/dashboard/:courseClassTimeTable/:page"
            element={<TimetableLoader />}
          />

          <Route
            path="/principal/dashboard/teacher/:teacherName/attendance"
            element={<TeacherPageLoader pageType="Attendance" />}
          />
          <Route
            path="/principal/dashboard/teacher/:teacherName/syallabus"
            element={<TeacherPageLoader pageType="Syallabus" />}
          />
          <Route
            path="/principal/dashboard/teacher/:teacherName/allotted-classes"
            element={<TeacherPageLoader pageType="Allotted" />}
          />
          <Route
            path="/principal/dashboard/teacher/:teacherName/profile"
            element={<TeacherPageLoader pageType="Profile" />}
          />

          <Route
            path="/principal/dashboard/TeacherAttendance"
            element={<Navigate to="/principal/dashboard/teacher/Naveen/attendance" replace />}
          />
          <Route
            path="/principal/dashboard/TeacherProfile"
            element={<Navigate to="/principal/dashboard/teacher/Naveen/profile" replace />}
          />
          <Route
            path="/principal/dashboard/TeacherAllottedClasses"
            element={<Navigate to="/principal/dashboard/teacher/Naveen/allotted-classes" replace />}
          />
          <Route
            path="/principal/dashboard/TeacherSyallabus"
            element={<Navigate to="/principal/dashboard/teacher/Naveen/syallabus" replace />}
          />

          <Route path="PaperSetter" element={<PaperSetter />} />

          <Route path="change-password" element={<ChangePassword />} />

          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>

        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route path="allotted-classes" element={<AllottedClasses />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="syallabus" element={<Syallabus />} />
          <Route
            path="papers"
            element={
              <RequireRoles roles={["teacher"]}>
                <PaperSetter />
              </RequireRoles>
            }
          />
        </Route>

        {/* STUDENT layout */}
        <Route
          path="/student/dashboard"
          element={
            <RequireRoles roles={["student"]}>
              <StudentLayout />
            </RequireRoles>
          }
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
