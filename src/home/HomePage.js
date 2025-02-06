import React, { useContext } from 'react';
import UserContext from '../auth/UserContext';
import './HomePage.css';

/** HomePage
 *
 * Displays a welcome message.
 * Shows the username if logged in; otherwise, asks user to log in or sign up.
 */
function HomePage() {
	const currentUser = useContext(UserContext);

	return (
		<div className="homepage">
			<h1>Welcome to Jobly</h1>
			{currentUser ? (
				<p>Hello, {currentUser.username}!</p>
			) : (
				<p>Please log in or sign up.</p>
			)}
		</div>
	);
}

export default HomePage;
