import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Profile from './Recruiter/Profile';
import MyJobs from './Recruiter/MyJobs';

const Recruiter = () => {
  return (
    <>
      <Navbar userType="recruiter" />
      <Routes>
        <Route path="/" element={<Navigate to="profile" />} />
        <Route path="profile" element={<Profile />} />
        <Route path="myjobs" element={<MyJobs />} />
      </Routes>
    </>
  );
};

export default Recruiter;
