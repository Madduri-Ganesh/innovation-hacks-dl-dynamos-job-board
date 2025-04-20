import { useParams, useNavigate } from "react-router-dom";
import { final_email_data } from "../../data/final_email_data";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBriefcase, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./CompanyDashboard.css";

const CompanyDashboard = () => {
  const { companyName } = useParams();
  const navigate = useNavigate();

  const companyData = final_email_data[companyName];

  if (!companyData) {
    return (
      <div className="company-dashboard-container">
        <h1>Company Not Found</h1>
        <button
          className="back-button"
          onClick={() => navigate("/candidate/jobs")}
        >
          Back to My Jobs
        </button>
      </div>
    );
  }

  const updates = companyData.updates || [];
  const actualCompanyName = companyData.companyName || "Unknown Company";
  const lastUpdate = updates[updates.length - 1];

  const getStatusColor = (status) => {
    const lower = status.toLowerCase();
    if (lower.includes("offer")) return "green";
    if (
      lower.includes("not selected") ||
      lower.includes("rejected") ||
      lower.includes("not proceeding")
    )
      return "red";
    if (lower.includes("interview")) return "blue";
    if (lower.includes("screening")) return "orange";
    return "#007bff"; // Default blue
  };

  const getStatusIcon = (status) => {
    const lower = status.toLowerCase();
    if (lower.includes("offer")) return <FaCheckCircle />;
    if (
      lower.includes("not selected") ||
      lower.includes("rejected") ||
      lower.includes("not proceeding")
    )
      return <FaTimesCircle />;
    return <FaBriefcase />;
  };

  return (
    <div className="company-dashboard-container">
      <h1 className="company-title">
        {actualCompanyName} - Application Timeline
      </h1>

      <div className="dashboard-layout">
        {/* Application Summary floating left */}
        <div className="summary-card">
          <h2>Application Summary</h2>
          <p>
            <strong>Stages Completed:</strong> {updates.length}
          </p>
          <p>
            <strong>Current Status:</strong> {lastUpdate?.status}
          </p>
          <p>
            <strong>Last Update:</strong> {lastUpdate?.date}
          </p>
        </div>

        {/* Timeline Center */}
        <div className="timeline-wrapper">
          <VerticalTimeline layout="1-column" lineColor="#007bff">
            {updates.map((update, index) => (
              <VerticalTimelineElement
                key={index}
                className="timeline-element"
                contentStyle={{
                  background: "var(--content-bg)",
                  color: "var(--text-color)",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid var(--content-bg)",
                }}
                date={update.date}
                iconStyle={{
                  background: getStatusColor(update.status),
                  color: "#fff",
                }}
                icon={getStatusIcon(update.status)}
                position="right"
              >
                <h3 className="timeline-status">{update.status}</h3>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      {/* Back Button */}
      <div className="back-button-container">
        <button
          className="back-button"
          onClick={() => navigate("/candidate/jobs")}
        >
          Back to My Jobs
        </button>
      </div>
    </div>
  );
};

export default CompanyDashboard;
