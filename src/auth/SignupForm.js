import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

/** SignupForm
 *
 * Props:
 *   - signup: function to perform signup
 *
 * Returns: signup form with default values for development
 */
function SignupForm({ signup }) {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		email: '',
	});
	const [errors, setErrors] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();
		const result = await signup(formData);
		if (result.success) {
			// Redirect to homepage after a successful signup
			navigate('/');
		} else {
			setErrors(result.errors);
		}
	}

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((data) => ({ ...data, [name]: value }));
	}

	return (
		<div className="signup-container">
			<h2>Signup</h2>
			{errors.length > 0 && (
				<div className="alert alert-danger">
					{errors.map((error) => (
						<p key={error}>{error}</p>
					))}
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label>Username</label>
					<input
						name="username"
						className="form-control"
						value={formData.username}
						onChange={handleChange}
						autoComplete="username"
					/>
				</div>
				<div className="mb-3">
					<label>Password</label>
					<input
						name="password"
						type="password"
						className="form-control"
						value={formData.password}
						onChange={handleChange}
						autoComplete="new-password"
					/>
				</div>
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
						autoComplete="email"
					/>
				</div>
				<button
					className="btn btn-primary"
					type="submit"
				>
					Signup
				</button>
			</form>
		</div>
	);
}

export default SignupForm;
