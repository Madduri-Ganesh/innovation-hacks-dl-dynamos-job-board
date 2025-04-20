import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userType }) => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        {userType === 'recruiter' ? 'Recruiter Dashboard' : 'Candidate Dashboard'}
      </div>
      <div className="navbar-links">
        <Link to="profile" className="nav-button">Profile</Link>
        {userType === 'recruiter' ? (
          <Link to="myjobs" className="nav-button">MyJobs</Link>
        ) : (
          <Link to="jobs" className="nav-button">Jobs</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
