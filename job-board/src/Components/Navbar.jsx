import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userType }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="back-button" onClick={handleBack}>⬅</button>
        <div className="navbar-title">
          {userType === 'recruiter' ? 'Recruiter Dashboard' : 'Candidate Dashboard'}
        </div>
      </div>
      <div className="navbar-links">
      <Link to={`/${userType}/profile`} className="nav-button">Profile</Link>
      {userType === 'recruiter' ? (
        <Link to="/recruiter/myjobs" className="nav-button">MyJobs</Link>
      ) : (
        <Link to="/candidate/jobs" className="nav-button">Jobs</Link>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
