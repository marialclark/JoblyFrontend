import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import JobCard from '../job/JobCard';
import Spinner from "../common/Spinner";

/** CompanyDetail
 *
 * Displays company details and job listings.
 *
 * Returns: company info and related jobs.
 *
 * Throws NotFoundError if not found
 */
function CompanyDetail({ applyToJob }) {
	const { handle } = useParams();
	const [company, setCompany] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch company details on mount and when handle changes
	useEffect(() => {
		async function fetchCompany() {
			try {
				const companyData = await JoblyApi.getCompany(handle);
				setCompany(companyData);
			} catch (errors) {
				console.error('Error fetching company details:', errors);
			} finally {
				setLoading(false);
			}
		}
		fetchCompany();
	}, [handle]);

	if (loading) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

	if (!company) {
		return (
			<div className="container">
				<p>Company not found.</p>
			</div>
		);
	}

	return (
		<div className="container">
			<h2>{company.name}</h2>
			<p>{company.description}</p>
			{company.logoUrl && (
				<img
					src={company.logoUrl}
					alt={`${company.name} logo`}
					className="img-fluid mb-3"
					style={{ maxWidth: '150px' }}
				/>
			)}
			<p>
				<strong>Employees:</strong> {company.numEmployees}
			</p>
			<h3>Jobs at {company.name}</h3>
			{company.jobs && company.jobs.length ? (
				company.jobs.map((job) => (
					<JobCard
						key={job.id}
						job={job}
						applyToJob={applyToJob}
					/>
				))
			) : (
				<p>No jobs listed for this company.</p>
			)}
		</div>
	);
}

export default CompanyDetail;
