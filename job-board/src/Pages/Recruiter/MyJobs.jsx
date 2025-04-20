// import { useState } from 'react';
import { useEffect, useState } from 'react';
import MyJobsForm from './MyJobsForm';
import './MyJobs.css';

const MyJobs = () => {
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [jobs, setJobs] = useState([]);



  const reactivateJob = async (jobId) => {
    try {
      const response = await fetch(`
  http://127.0.0.1:5000/jobs/${jobId}/reactivate`, {
        method: 'POST',
      });
      if (response.ok) {
        console.log('Job reactivated successfully');
        // fetchJobs(); // Refresh list
      } else {
        console.error('Failed to reactivate job');
      }
    } catch (error) {
      console.error('Error reactivating job:', error);
    }
  };
  
  useEffect(() => {
    fetch('http://127.0.0.1:5000/get_recruiter')
      .then(res => res.json())
      .then(data => {
        if (data && data._id) {
          setUserId(data._id);
        }
      })
      .catch(err => console.error('Failed to load recruiter:', err));
  }, []);

  useEffect(() => {
    if (userId) {
      fetch('http://127.0.0.1:5000/show_jobs')
        .then(res => res.json())
        .then(data => {
          const recruiterJobs = data.filter(job => job.recruiterId === userId); // filter if needed
          setJobs(recruiterJobs);
        })
        .catch(err => console.error('Failed to load jobs:', err));
    }
  }, [userId]);

  const refreshJobs = () => {
    fetch('http://127.0.0.1:5000/show_jobs')
      .then(res => res.json())
      .then(data => {
        const recruiterJobs = data.filter(job => job.recruiterId === userId);
        setJobs(recruiterJobs);
      })
      .catch(err => console.error('Failed to refresh jobs:', err));
  };
  
  

  return (
    
    <div className="myjobs-page-container">


      <div className="myjobs-container">
        <h1>My Posted Jobs</h1>
        <button className="add-job-button" onClick={() => setShowForm(true)}>
          ➕ Add a Job
        </button>

        {showForm && <MyJobsForm setShowForm={setShowForm} recruiterId={userId} refreshJobs={refreshJobs} />
 
      }

  {jobs.length > 0 ? (
    <div className="job-list">
      {jobs.map((job) => (
  <div key={job._id} className="job-card">
    <h3>{job.jobPosting}</h3>
    <p><strong>Company:</strong> {job.companyName}</p>
    <p><strong>Description:</strong> {job.jobDescription}</p>
    <p><strong>Skills:</strong> {job.skillsRequired || 'Not specified'}</p>
    <p><strong>Hiring Period:</strong> {job.hiring_period || 'Not mentioned'}</p>
    <p><strong>Date:</strong> {job.date}</p>
    <p><strong>Experience Level:</strong> {job.experienceLevel || 'Not specified'}</p>

    {/* ✅ NEW: Show Job Status */}
    <p><strong>Status:</strong> {job.jobState}</p>

    {/* ✅ NEW: If job is Inactive, show button */}
    {job.jobState === 'Inactive' && (
      <button
        className="add-job-button"
        onClick={() => reactivateJob(job._id)}
      >
        Reactivate Job
      </button>
    )}
  </div>
))}
    </div>
  ) : (
    <p>No jobs posted yet.</p>
  )}
      </div>
    </div>
  );
};

export default MyJobs;
