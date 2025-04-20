import { useEffect, useState } from 'react';
import './Profile.css';

const RecruiterProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null); // will be filled with fetched data
  const [loading, setLoading] = useState(true);
  const [recruiterId, setRecruiterId] = useState(null);


  useEffect(() => {
    fetch('http://127.0.0.1:5000/candidates')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
        const recruiter = data.find(user => user.role === 'Recruiter');
        if (recruiter) {
          setRecruiterId(recruiter._id); 
          setFormData({
            name: recruiter.name || '',
            email: recruiter.email || '',
            resume: recruiter.resume_link || '',
            company: recruiter.company_name || '',
            position: recruiter.current_position || '',
            location: recruiter.location || '',
            description: recruiter.description || '',
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching recruiter:', err);
        setLoading(false);
      });
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = async () => {
    if (isEditing && recruiterId) {
      // Send updated data to backend
      try {
        const updatedData = {
          name: formData.name,
          email: formData.email,
          resume_link: formData.resume,
          company_name: formData.company,
          current_position: formData.position,
          location: formData.location,
          description: formData.description,
        };
  
        const response = await fetch(`http://127.0.0.1:5000/candidates/${recruiterId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
  
        const result = await response.json();
        console.log("✅ Updated in DB:", result);
      } catch (err) {
        console.error("❌ Failed to update recruiter:", err);
      }
    }
  
    // Toggle editing state
    setIsEditing(prev => !prev);
  };
  

  if (loading) return <p style={{ padding: '20px' }}>Loading recruiter profile...</p>;

  if (!formData) return <p style={{ padding: '20px' }}>No recruiter data found.</p>;

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
