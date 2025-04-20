import { useState } from 'react';
import MyJobsForm from './MyJobsForm';
import './MyJobs.css';

const MyJobs = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="myjobs-container">
      <h1>My Posted Jobs</h1>
      <button className="add-job-button" onClick={() => setShowForm(true)}>
        ➕ Add a Job
      </button>

      {showForm && <MyJobsForm setShowForm={setShowForm} />}

      <p>This is where the recruiter sees their posted jobs.</p>
    </div>
  );
};

export default MyJobs;
