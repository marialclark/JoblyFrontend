import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';
import Spinner from '../common/Spinner';
import './CompanyList.css';

/** CompanyList
 *
 * Renders a list of companies with a search box to filter companies by name.
 * Filtering is done by querying the backend, not by client-side filtering.
 *
 * Returns: div containing search form and list of CompanyCard components
 */
function CompanyList() {
	const [companies, setCompanies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCompanies() {
			try {
				let companies = await JoblyApi.getCompanies(searchTerm);
				setCompanies(companies);
			} catch (errors) {
				console.error('Error fetching companies:', errors);
			} finally {
				setLoading(false);
			}
		}
		fetchCompanies();
	}, [searchTerm]);

	const handleSearchChange = (evt) => {
		setSearchTerm(evt.target.value);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setLoading(true);
	};

	return (
		<div className="container">
			<h2>Companies</h2>
			<form
				onSubmit={handleSubmit}
				className="mb-4"
			>
				<div className="company-search-group">
					<input
						type="text"
						className="company-search-input"
						placeholder="Search companies..."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<button
						className="company-search-btn"
						type="submit"
					>
						Search
					</button>
				</div>
			</form>
			{loading ? (
				<Spinner />
			) : companies.length ? (
				companies.map((company) => (
					<CompanyCard
						key={company.handle}
						company={company}
					/>
				))
			) : (
				<p>No companies found.</p>
			)}
		</div>
	);
}

export default CompanyList;
