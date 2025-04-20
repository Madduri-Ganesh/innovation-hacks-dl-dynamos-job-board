import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { final_email_data } from "../../data/final_email_data";
import "./MyJobs.css"; // Import your CSS file

//New helper function to decide the color class based on status
const getStatusColorClass = (status) => {
  const lower = status.toLowerCase();
  if (lower.includes("offer")) return "status-offer";
  if (
    lower.includes("not selected") ||
    lower.includes("not proceeding") ||
    lower.includes("rejected") ||
    (lower.includes("application") && lower.includes("update"))
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
      setJobs(final_email_data);
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
          //Sort updates by date (most recent last)
          const sortedUpdates = updates
            .slice()
            .sort((a, b) => new Date(a.date) - new Date(b.date));

          //Now pick the last item
          const latest = sortedUpdates[sortedUpdates.length - 1];
          return (
            <div key={slug} className="job-card">
              <h2>{companyName}</h2>
              {/*Apply color class dynamically */}
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
