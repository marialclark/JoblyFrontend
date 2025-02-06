import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

/** Navigation component.
 *
 * Renders:
 * - Jobly (home)
 * - If not logged in: Login, Signup
 *   If logged in: Companies, Jobs, Profile, Logout
 *
 * Props:
 *   - currentUser: logged-in user object (or null)
 *   - logout: function to log out
 */
function Navigation({ currentUser, logout }) {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
			<div className="container-fluid d-flex justify-content-between">
				<Link
					className="navbar-brand"
					to="/"
				>
					Jobly
				</Link>
				<div className="collapse navbar-collapse justify-content-end">
					<ul className="navbar-nav">
						{currentUser ? (
							<>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/companies"
									>
										Companies
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/jobs"
									>
										Jobs
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/profile"
									>
										Profile
									</Link>
								</li>
								<li className="nav-item">
									<button
										className="btn nav-link"
										onClick={logout}
									>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/login"
									>
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/signup"
									>
										Signup
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
