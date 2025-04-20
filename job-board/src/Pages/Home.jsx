import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Job Portal</h1>
      <Link to="/recruiter">
        <button>Go to Recruiter</button>
      </Link>
      <Link to="/candidate">
        <button>Go to Candidate</button>
      </Link>
    </div>
  );
};

export default Home;
