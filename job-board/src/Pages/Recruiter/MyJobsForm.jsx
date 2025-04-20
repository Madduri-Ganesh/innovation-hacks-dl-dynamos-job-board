import { useState } from 'react';
import './MyJobsForm.css';

const MyJobsForm = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobPosting: '',
    jobDescription: '',
    experienceLevel: '',
    date: '',
    skillsRequired: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Submitted:', formData);
    setShowForm(false); // Close the popup
  };

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

          <label>Experience Level:</label>
          <input
            type="text"
            name="experienceLevel"
            value={formData.experienceLevel}
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
