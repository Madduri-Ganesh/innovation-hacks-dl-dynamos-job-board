import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Profile from './Candidate/Profile';
import Jobs from './Candidate/Jobs';

const Candidate = () => {
  return (
    <>
      <Navbar userType="candidate" />
      <Routes>
        <Route path="/" element={<Navigate to="profile" />} />
        <Route path="profile" element={<Profile />} />
        <Route path="jobs" element={<Jobs />} />
      </Routes>
    </>
  );
};

export default Candidate;
