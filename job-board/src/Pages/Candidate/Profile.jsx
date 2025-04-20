import { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Frank',
    email: 'veryfranklee@gmail.com',
    resume: '',
    skills: 'Java, Python',
    education: 'Bachelor of Science in Computer Science - XYZ University',
    experience: '2 years at ABC Corp as a Software Developer',
    certification: 'AWS Certified Developer – Associate',
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
        <h1>Candidate Profile</h1>
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
                  rows={key === 'skills' ? 2 : 3}
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

export default Profile;
