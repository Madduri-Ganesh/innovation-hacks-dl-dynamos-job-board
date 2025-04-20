import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyData } from "../../dummy";
import "./MyJobs.css"; // Import your CSS file

const slugify = (text) => {
  return text.toLowerCase().replace(/\s+/g, "-");
};

//New helper function to decide the color class based on status
const getStatusColorClass = (status) => {
  const lower = status.toLowerCase();
  if (lower.includes("offer")) return "status-offer";
  if (
    lower.includes("not selected") ||
    lower.includes("not proceeding") ||
    lower.includes("rejected")
  )
    return "status-rejected";
  if (
    lower.includes("interview") ||
    lower.includes("screening") ||
    lower.includes("application")
  )
    return "status-inprogress";
  return "";
};

const MyJobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fake loading for 2 seconds
    setTimeout(() => {
      setJobs(dummyData);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <div className="loading">Loading your job applications...</div>;
  }

  return (
    <div className="my-jobs-container">
      <h1>My Jobs</h1>
      <div className="jobs-list">
        {Object.keys(jobs).map((slug) => {
          const { companyName, updates } = jobs[slug];
          const latest = updates[updates.length - 1];
          return (
            <div key={slug} className="job-card">
              <h2>{companyName}</h2>
              {/* ⭐️ Apply color class dynamically */}
              <p className={`job-status ${getStatusColorClass(latest.status)}`}>
                Latest Status: {latest.status}
              </p>
              <button onClick={() => navigate(`/candidate/company/${slug}`)}>
                View Timeline
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyJobsPage;
