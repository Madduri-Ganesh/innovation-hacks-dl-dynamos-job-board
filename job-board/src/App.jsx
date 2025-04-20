import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recruiter from './Pages/Recruiter';
import Candidate from './Pages/Candidate';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recruiter/*" element={<Recruiter />} />
        <Route path="/candidate/*" element={<Candidate />} />
      </Routes>
    </Router>
  );
}

export default App;
