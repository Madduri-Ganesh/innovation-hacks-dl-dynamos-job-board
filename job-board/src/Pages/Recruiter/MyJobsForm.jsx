import { useState } from 'react';
import './MyJobsForm.css';

const MyJobsForm = ({ setShowForm, recruiterId, refreshJobs }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobPosting: '',
    jobDescription: '',
    hiring_period: '',
    date: '',
    skillsRequired: '',
    jobState: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Job Submitted:', formData);
  //   setShowForm(false); // Close the popup
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      recruiterId: recruiterId,  // <-- attach the logged-in recruiter's ID here
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/add_job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Job added:', result);
        alert('Job successfully submitted!');
        setShowForm(false);
        refreshJobs();
      } else {
        console.error('Failed:', result.error);
      }
    } catch (err) {
      console.error('Error submitting job:', err);
    }
  }
  

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Job Details</h2>
        <form onSubmit={handleSubmit}>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

          <label>Job Posting:</label>
          <input
            type="text"
            name="jobPosting"
            value={formData.jobPosting}
            onChange={handleChange}
            required
          />

          <label>Job Description:</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            required
          />

          <label>Hiring period:</label>
          <input
            type="text"
            name="hiring_period"
            value={formData.hiring_period}
            onChange={handleChange}
          />

          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Skills Required:</label>
          <input
            type="text"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyJobsForm;
