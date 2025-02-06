import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

/** LoginForm
 *
 * Props:
 *   - login: function to perform login
 *
 * Returns: login form with default values for development
 */
function LoginForm({ login }) {
	const navigate = useNavigate(); // For redirecting
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [errors, setErrors] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();
		const result = await login(formData);
		if (result.success) {
			// Redirect to the homepage on successful login
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
		<div className="login-container">
			<h2>Login</h2>
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
						autoComplete="current-password"
					/>
				</div>
				<button
					className="btn btn-primary"
					type="submit"
				>
					Login
				</button>
			</form>
		</div>
	);
}

export default LoginForm;
