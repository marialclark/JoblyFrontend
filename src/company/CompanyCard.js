import React from "react";
import { Link } from "react-router-dom";
import './CompanyCard.css';

/** CompanyCard
 *
 * Renders a card with basic info about a company.
 *
 * Props can include: {handle, name, description, numEmployees, logoUrl}
 *
 * Return: card element that links to company detail page
 */
function CompanyCard({ company }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/companies/${company.handle}`}>{company.name}</Link>
        </h5>
        <p className="card-text">{company.description}</p>
        {company.logoUrl && (
          <img
            src={company.logoUrl}
            alt={`${company.name} logo`}
            className="img-fluid mb-2"
            style={{ maxWidth: "100px" }}
          />
        )}
        <p className="card-text">
          <small className="text-muted">
            Employees: {company.numEmployees}
          </small>
        </p>
      </div>
    </div>
  );
}

export default CompanyCard;
