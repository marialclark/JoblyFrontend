import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../home/HomePage';
import CompaniesPage from '../company/CompaniesPage';
import CompanyDetail from '../company/CompanyDetail';
import JobsPage from '../job/JobsPage';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfilePage from '../profile/ProfilePage';
import NotFoundPage from '../common/NotFoundPage';
import PrivateRoute from "./PrivateRoute";

/** Routes
 *
 * Sets up the routing for the application.
 *
 * Routes:
 *   "/"          => HomePage
 *   "/login"     => LoginForm
 *   "/signup"    => SignupForm
 *   "*"          => NotFoundPage
 * 
 * Private Route (require login):
 *   "/companies" => CompaniesPage
 *   "/companies/:handle" => CompanyDetail
 *   "/jobs"      => JobsPage
 *   "/profile"   => ProfilePage
 */
function AppRoutes({ login, signup, updateProfile, applyToJob }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:handle" element={<CompanyDetail applyToJob={applyToJob} />} />
        <Route path="/jobs" element={<JobsPage applyToJob={applyToJob} />} />
        <Route path="/profile" element={<ProfilePage updateProfile={updateProfile} />} />
      </Route>
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
