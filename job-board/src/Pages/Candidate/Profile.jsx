import { useEffect, useState } from 'react';
import './Profile.css';

const CandidateProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [candidateId, setCandidateId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/candidates')
      .then(res => res.json())
      .then(data => {
        const candidate = data.find(user => user.role?.toLowerCase() === 'candidate');
        if (candidate) {
          setCandidateId(candidate._id);  // store MongoDB _id
          setFormData({
            name: candidate.name || '',
            email: candidate.email || '',
            resume: candidate.resume_link || '',
            skills: candidate.skills || '',
            education: candidate.education || '',
            experience: candidate.experience || '',
            certification: candidate.certification || '',
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching candidate:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = async () => {
    if (isEditing && candidateId) {
      try {
        const updatedData = {
          name: formData.name,
          email: formData.email,
          resume: formData.resume,
          skills: formData.skills,
          education: formData.education,
          experience: formData.experience,
          certification: formData.certification,
        };

        const response = await fetch(`http://127.0.0.1:5000/candidates/${candidateId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        const result = await response.json();
        console.log('✅ Candidate updated:', result);
      } catch (err) {
        console.error('❌ Update failed:', err);
      }
    }

    setIsEditing(prev => !prev);
  };

  if (loading) return <p style={{ padding: '20px' }}>Loading candidate profile...</p>;

  if (!formData) return <p style={{ padding: '20px' }}>No candidate data found.</p>;

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
                  rows={key === 'skills' || key === 'education' ? 2 : 3}
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

export default CandidateProfile;
