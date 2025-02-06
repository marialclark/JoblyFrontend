import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../auth/UserContext';
import './ProfilePage.css'; // Import the CSS

/** ProfilePage
 *
 * Displays and updates user profile info.
 *
 * Returns: form with user details and update option.
 */
function ProfilePage({ updateProfile }) {
	const currentUser = useContext(UserContext);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState([]);

	// Load user data into form on mount/update
	useEffect(() => {
		if (currentUser) {
			setFormData({
				firstName: currentUser.firstName || '',
				lastName: currentUser.lastName || '',
				email: currentUser.email || '',
				password: '',
			});
		}
	}, [currentUser]);

	// Handle input changes
	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((fData) => ({ ...fData, [name]: value }));
	}

	// Handle form submission
	async function handleSubmit(evt) {
		evt.preventDefault();
		const updateData = { ...formData };
		if (!updateData.password) delete updateData.password;
		const result = await updateProfile(updateData);

		if (result.success) {
			setMessage('Profile updated successfully.');
			setErrors([]);
		} else {
			setErrors(result.errors);
			setMessage('');
		}
	}

	if (!currentUser)
		return (
			<div className="profile-container">
				<p>Please log in to view your profile.</p>
			</div>
		);

	return (
		<div className="profile-container">
			<h2>Profile</h2>
			<p>Username: {currentUser.username}</p>

			{message && <div className="alert alert-success">{message}</div>}
			{errors.length > 0 && (
				<div className="alert alert-danger">
					{errors.map((err, idx) => (
						<p key={idx}>{err}</p>
					))}
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label>First Name</label>
					<input
						name="firstName"
						className="form-control"
						value={formData.firstName}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label>Last Name</label>
					<input
						name="lastName"
						className="form-control"
						value={formData.lastName}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label>Email</label>
					<input
						name="email"
						type="email"
						className="form-control"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<button
					className="btn btn-primary"
					type="submit"
				>
					Save Changes
				</button>
			</form>
		</div>
	);
}

export default ProfilePage;
