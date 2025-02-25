import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	/** Get current user data.
	 * Accepts:
	 *  - username - the username of the current user
	 *
	 * Returns {username, firstName, lastName, email, isAdmin, applications}
	 *
	 * Throws NotFoundError if not found.
	 */
	static async getCurrentUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	/** Get details on a company by handle.
	 * Acccepts:
	 *  - handle - the unique handle for the company
	 *
	 * Returns {handle, name, description, numEmployees, logoUrl, jobs}
	 *
	 * Throws NotFoundError if not found.
	 */
	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	/** Get companies (filtered by name if provided).
	 * Accepts:
	 *  - name (optional) - a search term to filter companies by name
	 *
	 * Returns an array of companies: [{handle, name, description, numEmployees, logoUrl}, ...]
	 */
	static async getCompanies(name) {
		let res = await this.request('companies', name ? { name } : {});
		return res.companies;
	}

	/** Get list of jobs (filtered by title if provided).
	 * Accepts:
	 *  - title (optional) - a search term to filter jobs by title
	 *
	 * Returns an array of jobs: [{id, title, salary, equity, companyHandle}, ...]
	 */
	static async getJobs(title) {
		let res = await this.request('jobs', title ? { title } : {});
		return res.jobs;
	}

	/** Apply to a job.
	 * Accepts:
	 *  - username - the username of the user applying
	 *  - id - the id of the job being applied to
	 *
	 * Returns {applied: jobId} on success.
	 */
	static async applyToJob(username, id) {
		let res = await this.request(`users/${username}/jobs/${id}`, {}, 'post');
		return res.applied;
	}

	/** Get token for login from username, password.
	 * Accepts:
	 *  - data - {username, password}
	 *
	 * Returns {token: tokenString}
	 */
	static async login(data) {
		let res = await this.request('auth/token', data, 'post');
		return res.token;
	}

	/** Signup for site.
	 * Accepts:
	 *  - data - {username, password, firstName, lastName, email}
	 *
	 * Returns {token: tokenString}
	 */
	static async signup(data) {
		let res = await this.request('auth/register', data, 'post');
		return res.token;
	}

	/** Save user profile page.
	 *
	 * A "partial update". Data doesn't contain all the
	 * fields. This only changes provided ones.
	 *
	 * Data can include: {firstName, lastName, email, password}
	 *
	 * Returns {username, firstName, lastName, email, isAdmin, applications}
	 *
	 * Throws NotFoundError if not found.
	 */
	static async saveProfile(username, data) {
		let res = await this.request(`users/${username}`, data, 'patch');
		return res.user;
	}
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
	'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
	'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default JoblyApi;
