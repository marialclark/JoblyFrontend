import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import JoblyApi from './api';
import Navigation from './routes/Navigation';
import AppRoutes from './routes/Routes';
import UserContext from './auth/UserContext';
import useLocalStorage from './hooks/useLocalStorage';

/** App
 *
 * - Uses localStorage to for token
 * - Loads currentUser based on token changes
 * - Provides login, signup, and logout functions
 */
function App() {
	// Token is stored in localStorage
	const [token, setToken] = useLocalStorage('token', null);
	const [currentUser, setCurrentUser] = useState(null);

	// When token changes, load user data
	useEffect(() => {
		async function loadUser() {
			if (token) {
				try {
					const { username } = jwtDecode(token);
					JoblyApi.token = token;
					const user = await JoblyApi.getCurrentUser(username);
					setCurrentUser(user);
				} catch (error) {
					setCurrentUser(null);
				}
			} else {
				setCurrentUser(null);
			}
		}
		loadUser();
	}, [token]);

	async function login(data) {
		try {
			const token = await JoblyApi.login(data);
			setToken(token);
			return { success: true };
		} catch (errors) {
			return { success: false, errors };
		}
	}

	async function signup(data) {
		try {
			const token = await JoblyApi.signup(data);
			setToken(token);
			return { success: true };
		} catch (errors) {
			return { success: false, errors };
		}
	}

	function logout() {
		setToken(null);
		setCurrentUser(null);
		JoblyApi.token = null;
	}

	async function updateProfile(data) {
		try {
			const updatedUser = await JoblyApi.saveProfile(
				currentUser.username,
				data
			);
			setCurrentUser(updatedUser);
			return { success: true };
		} catch (errors) {
			return { success: false, errors };
		}
	}

	async function applyToJob(jobId) {
		try {
			await JoblyApi.applyToJob(currentUser.username, jobId);
			setCurrentUser((u) => ({
				...u,
				applications: u.applications ? [...u.applications, jobId] : [jobId],
			}));
			return { success: true };
		} catch (errors) {
			return { success: false, errors };
		}
	}

	return (
		<BrowserRouter>
			<UserContext.Provider value={currentUser}>
				<Navigation
					currentUser={currentUser}
					logout={logout}
				/>
				<AppRoutes
					login={login}
					signup={signup}
					updateProfile={updateProfile}
					applyToJob={applyToJob}
				/>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
