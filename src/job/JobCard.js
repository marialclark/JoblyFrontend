import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./JobCard.css";

/** JobCard
 *
 * Displays job details and apply button.
 * 
 * Props:
 *  - job: { id, title, salary, equity, companyHandle }
 *
 * Returns: job info with apply functionality.
 */
function JobCard({ job, applyToJob }) {
  const currentUser = useContext(UserContext);

  // Check if user has already applied for the job
  const initiallyApplied =
    currentUser && currentUser.applications
      ? currentUser.applications.includes(job.id)
      : false;

  const [applied, setApplied] = useState(initiallyApplied);
  const [error, setError] = useState(null);

  // Handle job application
  async function handleApply() {
    const result = await applyToJob(job.id);
    if (result.success) setApplied(true);
    else setError("Failed to apply.");
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text">
          {job.salary ? `Salary: $${job.salary}` : "Salary: N/A"} <br />
          {job.equity ? `Equity: ${job.equity}` : "Equity: N/A"}
        </p>
        <p className="card-text">
          <small className="text-muted">
            Company: <Link to={`/companies/${job.companyHandle}`}>{job.companyHandle}</Link>
          </small>
        </p>
        {currentUser && (
          <button className="btn btn-secondary" onClick={handleApply} disabled={applied}>
            {applied ? "Applied" : "Apply"}
          </button>
        )}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}

export default JobCard;
