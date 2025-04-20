import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Profile from "./Candidate/Profile";
import MyJobs from "./Candidate/MyJobs";
import CompanyDashboard from "./Candidate/CompanyDashboard";

const Candidate = () => {
  return (
    <>
      <Navbar userType="candidate" />
      <Routes>
        <Route path="/" element={<Navigate to="profile" />} />
        <Route path="profile" element={<Profile />} />
        <Route path="jobs" element={<MyJobs />} />
        <Route path="company/:companyName" element={<CompanyDashboard />} />
      </Routes>
    </>
  );
};

export default Candidate;
