# Jobly - Frontend

## Overview

Jobly is a full-stack job board application that allows users to browse companies, view job listings, and apply for jobs. This is the **frontend** repository, built with **React**. A mock database is used with machine generated data.

**Repository URL:** [https://github.com/marialclark/JoblyFrontend](https://github.com/marialclark/JoblyFrontend)

## Tech Stack

- **Frontend:** React, React Router, Context API, Tailwind CSS / Bootstrap
- **Backend API:** Node.js, Express (Connected to Render Backend)
- **Authentication:** JWT (Stored in LocalStorage)
- **Database:** PostgreSQL (via Supabase)

## Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/marialclark/JoblyFrontend.git
   cd JoblyFrontend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Run the app locally**
   ```sh
   npm start
   ```
   The app will be available at `http://localhost:3000`

## Features

- **User Authentication:** Sign up, login, and logout functionality
- **Company Directory:** Browse and search for companies
- **Job Listings:** View all jobs and search for specific ones
- **Profile Editing:** Users can update their profile information
- **Job Applications:** Apply for jobs directly through the UI
- **Navigation Bar:** Shows login/signup or user profile based on authentication status

## Authentication & Security

- **JWT Authentication:** Users receive a **JWT token** upon login, which is stored in **localStorage**
- **Protected Routes:** Users must be logged in to access company details, job listings, and profile pages

## Contributors

- **Maria L. Clark** - Full-Stack Developer
