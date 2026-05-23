# Job Portal Frontend

Frontend for a full-stack Job Portal web application built using React, Tailwind CSS, and Vite.

The application allows users to browse jobs, apply for positions, and recruiters to manage job postings through a dedicated dashboard.

---

## Live Demo

**Frontend Deployment:** https://job-portal-frontend-six-pi.vercel.app/

**Backend Repository:** https://github.com/Liberalcap/job-portal-backend

---

## Features

### Authentication

- User login & registration
- Recruiter login & registration
- JWT authentication
- Protected routes
- Forgot password & reset password

### Job Seeker Features

- Browse all jobs
- View job details
- Apply for jobs
- View applied jobs

### Recruiter Features

- Recruiter dashboard
- Create job postings
- Edit jobs
- Manage job listings
- View applicants/users

### UI Features

- Responsive design
- Modern clean interface
- Loading states
- Error handling
- Role-based navigation

---

## Screenshots

### Homepage

![Homepage](screenshots/homepage.png)

---

### Login Page

![Login Page](screenshots/login-page.png)

---

### Jobs Listing Page

![Jobs Page](screenshots/jobs-page.png)

---

### Job Details Page

![Job Details](screenshots/job-details.png)

---

### Recruiter Dashboard

![Recruiter Dashboard](screenshots/recruiter-dashboard.png)

---

### Create Job Page

![Create Job](screenshots/create-job.png)

---

### My Applications Page

![My Applications](screenshots/my-applications.png)

---

### Forgot Password Page

![Forgot Password](screenshots/forgot-password.png)

## Tech Stack

- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool & dev server

---

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <https://github.com/Liberalcap/job-portal-frontend>
cd job-portal-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# Add other environment variables as needed
```

**Note:** Variables must be prefixed with `VITE_` to be accessible in the frontend.

---

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

---

## Folder Structure

```
src/
 ├── assets/                 # Static assets
 ├── components/             # Reusable components
 │   ├── LoadingBar.jsx
 │   ├── Navbar.jsx
 │   └── Skeleton.jsx
 ├── context/                # React Context (state management)
 │   └── LoadingContext.jsx
 ├── pages/                  # Page components
 │   ├── HomePage.jsx
 │   ├── JobsPage.jsx
 │   ├── JobDetails.jsx
 │   ├── LoginPage.jsx
 │   ├── RegisterPage.jsx
 │   ├── CreateJob.jsx
 │   ├── EditJob.jsx
 │   ├── RecruiterDashboard.jsx
 │   ├── MyApplications.jsx
 │   ├── UsersPage.jsx
 │   ├── ForgotPasswordPage.jsx
 │   └── ResetPasswordPage.jsx
 ├── services/               # API service calls
 │   ├── api.js             # Axios instance & interceptors
 │   ├── authService.js     # Authentication endpoints
 │   ├── jobService.js      # Job-related endpoints
 │   ├── applicationService.js  # Application endpoints
 │   └── userService.js     # User endpoints
 ├── App.jsx                # Main app component
 ├── main.jsx               # Entry point
 ├── index.css              # Global styles
 └── App.css                # App-level styles
```

---

## API Configuration

The application connects to a backend API. Ensure your backend is running and the `VITE_API_BASE_URL` is correctly configured in your `.env` file.

**Backend Endpoints Used:**

- Authentication: `/auth/login`, `/auth/register`, `/auth/forgot-password`, etc.
- Jobs: `/jobs`, `/jobs/:id`, `/jobs/create`, `/jobs/:id/edit`
- Applications: `/applications`, `/applications/:id/apply`
- Users: `/users`, `/users/:id`

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For issues or questions, please open an issue on the GitHub repository.
