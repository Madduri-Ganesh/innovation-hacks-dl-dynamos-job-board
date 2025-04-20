import { useState } from 'react';
import './Profile.css';

const RecruiterProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Emily Carter',
    email: 'emily@recruitcorp.com',
    resume: 'https://example.com/resume.pdf',
    company: 'RecruitCorp Ltd.',
    position: 'Technical Recruiter',
    location: 'San Francisco, CA',
    description: 'Looking for full-stack engineers with experience in React and Node.js.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Recruiter Profile</h1>
        <button className="edit-icon" onClick={toggleEdit}>
          ✏️ {isEditing ? 'Done' : 'Edit'}
        </button>
      </div>
      <form className="profile-form">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="profile-field">
            <label className="profile-label">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            {isEditing ? (
              key === 'resume' ? (
                <input
                  type="url"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder="Paste resume link"
                  className="profile-input"
                />
              ) : (
                <textarea
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="profile-textarea"
                  rows={key === 'description' ? 4 : 2}
                />
              )
            ) : (
              <p className="profile-readonly">{value || 'Not provided'}</p>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default RecruiterProfile;
