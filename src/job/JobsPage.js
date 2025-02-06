import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import JobCard from './JobCard';
import Spinner from '../common/Spinner';
import './JobsPage.css';

/** JobsPage
 *
 * Displays a list of jobs with a search feature.
 *
 * Returns: job listings and search input.
 */
function JobsPage({ applyToJob }) {
	const [jobs, setJobs] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);

	// Fetch jobs on mount and when search term changes
	useEffect(() => {
		async function fetchJobs() {
			try {
				const jobs = await JoblyApi.getJobs(searchTerm);
				setJobs(jobs);
			} catch (errors) {
				console.error('Error fetching jobs:', errors);
			} finally {
				setLoading(false);
			}
		}
		fetchJobs();
	}, [searchTerm]);

	const handleSearchChange = (evt) => setSearchTerm(evt.target.value);
	const handleSubmit = (evt) => {
		evt.preventDefault();
		setLoading(true);
	};

	return (
		<div className="container">
			<h2>Jobs</h2>
			<form
				onSubmit={handleSubmit}
				className="mb-4"
			>
				<div className="job-search-group">
					<input
						type="text"
						className="job-search-input"
						placeholder="Search jobs..."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<button
						className="job-search-btn"
						type="submit"
					>
						Search
					</button>
				</div>
			</form>
			{loading ? (
				<Spinner />
			) : jobs.length ? (
				jobs.map((job) => (
					<JobCard
						key={job.id}
						job={job}
						applyToJob={applyToJob}
					/>
				))
			) : (
				<p>No jobs found.</p>
			)}
		</div>
	);
}

export default JobsPage;
