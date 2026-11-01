# Task Management & Student Portfolio — Frontend Application

[![Frontend CI/CD Status](https://github.com/rutvii893/task-manager-docker-compose/actions/workflows/ci.yml/badge.svg)](https://github.com/rutvii893/task-manager-docker-compose/actions/workflows/ci.yml)
[![Vite Production Build](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Version](https://img.shields.io/badge/React-19.2.7-61DAFB?logo=react&logoColor=black)](https://react.dev/)

**Course:** Advanced Web Development Frameworks (AWDF) / ITUE301  
**Student:** Rutvi Arora  
**Roll No:** 24IT002  
**Institute:** CHARUSAT University  

---

## 1. Project Overview & Architecture

This repository hosts the client-side user interface of the **Task Management Application & Engineering Portfolio**, progressively built and refined across **Practicals 1 to 13**. Built with **React 19**, **Vite**, and **React Router v7**, it implements a modern component-driven single-page architecture (SPA) featuring route-based code splitting, asynchronous API integration, JWT token-based authentication, real-time task CRUD state management, and an AI-powered Task Description Generator powered by Google Gemini via the backend proxy.

### Full-Stack Architecture & Data Flow

The frontend acts as the user interface layer in a decoupled 3-tier full-stack architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        React Frontend (Vite)                           │
│  - Port: 5173 (Dev) / 5173 (Docker Preview via Container)              │
│  - SPA Routing: React Router v7 (Home, Projects, Contact, Auth)        │
│  - HTTP Client: Fetch API abstraction layer (src/api.js)               │
│  - State: React Hooks (useState, useEffect, useMemo)                   │
│  - Optimization: React.lazy() + Suspense chunk streaming               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST / JSON
                                    │ Bearer Token in Authorization Header
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Express.js Backend API                          │
│  - Port: 5000 (Node.js / Express 5)                                    │
│  - Routes: /auth, /tasks, /api/ai/generate-description                 │
│  - Middleware: CORS, JSON parser, JWT verification, Rate limiter       │
│  - Caching Layer: node-cache (TTL 60s) for query optimization          │
│  - Event Pipeline: EventEmitter for asynchronous task notifications    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Mongoose ODM / Queries
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       Database / External Services                     │
│  - MongoDB (Port 27017 or Atlas Cloud cluster)                         │
│  - Google Gemini API (gemini-2.5-flash via @google/genai SDK)          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

| Category | Technology | Version | Purpose / Scope |
|:---|:---|:---|:---|
| **Core Framework** | React.js | `^19.2.7` | UI library, declarative components, hooks-based state management |
| **DOM Renderer** | React DOM | `^19.2.7` | Virtual DOM reconciliation and browser DOM mounting |
| **Build Tool & Bundler** | Vite | `^8.1.1` | Ultra-fast HMR dev server and Rollup-based production chunking |
| **Client-Side Routing** | React Router DOM | `^7.18.1` | Declarative SPA routing, dynamic route transitions, URL navigation |
| **Linter & Code Quality** | Oxlint | `^1.71.0` | High-performance Rust-based JavaScript and JSX static analysis |
| **Containerization** | Docker & Docker Compose | Multi-stage | Alpine Node.js 22 build stage + Node.js 18 production preview |
| **External AI Integration** | Google Gemini API | `gemini-2.5-flash` | Context-aware 1-2 sentence task description generator (backend-proxied) |
| **Styling & Theming** | Custom Modern CSS | Pure CSS Variables | Glassmorphism, CSS grid/flexbox, responsive layout, CSS keyframes |

---

## 3. Practical-Wise Implementation Index

| Practical | Academic Focus | Frontend Component / File | Key Feature Implemented |
|:---:|:---|:---|:---|
| **Practical 1** | React Intro & Component Architecture (CO1) | `src/components/Header.jsx`, `About.jsx`, `Skills.jsx`, `Footer.jsx` | Modular layout, props passing, reusable functional components |
| **Practical 2** | State Management & Routing (CO1) | `src/App.jsx`, `src/components/Navbar.jsx`, `src/components/Contact.jsx` | `react-router-dom` setup, `useState` form input binding, character counter |
| **Practical 3** | API Integration & Data Rendering (CO1) | `src/components/Projects.jsx`, `Spinner.jsx`, `ErrorMessage.jsx` | Asynchronous data fetching, loading spinners, error handling & retries |
| **Practical 4** | RESTful API with Node.js & Express (CO2) | `src/api.js` (client contract) | Alignment with backend REST conventions (`/tasks` endpoints) |
| **Practical 5** | MongoDB & Schema Design with Mongoose (CO2, CO3) | `src/components/Projects.jsx` | Rendering MongoDB document models (`title`, `description`, `priority`, `completed`) |
| **Practical 6** | Full Stack Integration: React + Node + Mongo (CO1, CO2) | `src/api.js`, `src/components/Projects.jsx` | Full client-server CRUD cycle: `GET`, `POST`, `PUT`, `DELETE` over HTTP |
| **Practical 7** | Authentication & Middleware Pipeline (CO2, CO6) | `src/components/Login.jsx`, `Register.jsx`, `Navbar.jsx`, `src/api.js` | JWT login/registration forms, `localStorage` token storage, Bearer headers, protected route redirection |
| **Practical 8** | Performance Optimization & Lazy Loading (CO1) | `src/App.jsx`, `src/components/LoadingFallback.jsx` | `React.lazy()` dynamic imports, `<Suspense>` fallback, route-level chunk splitting |
| **Practical 9** | In-Memory Caching & Query Optimization (CO2, CO4) | `src/api.js`, `src/components/Projects.jsx` | Consuming cached backend responses with instantaneous round-trip speeds |
| **Practical 10** | Asynchronous Processing with Event-Driven Architecture (CO4) | `src/components/Projects.jsx` | Non-blocking UI task submission while backend triggers async event listeners |
| **Practical 11** | Containerization with Docker & Docker Compose (CO5) | `Dockerfile`, `.dockerignore`, `docker-compose.yml` | Multi-stage Alpine containerization serving production build on port 5173 |
| **Practical 12** | CI/CD Pipeline with GitHub Actions (CO5) | Multi-repo architecture & submodule reference | Orchestrated verification with the parent repository's automated CI workflows |
| **Practical 13** | AI API Integration into a Web Application | `src/components/Projects.jsx`, `src/api.js` | "Generate Description" button, loading spinner, editable textarea, Responsible AI disclaimer |

---

## 4. Comprehensive Practical Documentation

---

### Practical 1 – Week 1: Introduction to React and Component Architecture (CO1)

#### Objective
Establish a clean, modular React application architecture using Vite. Deconstruct the portfolio user interface into independent, reusable functional components adhering to unidirectional data flow and props validation.

#### Frontend Implementation
- Initialized a responsive single-page web application featuring a sticky top navigation bar, hero banner, about card, categorized skill matrix, and footer.
- Established a single source of truth for developer skills in `src/components/Home.jsx`, categorized by domain (`languages`, `frontend`, `backend`, `database`, `ai`, `tools`), and passed it down to child components via props.

#### Components and Files Used
- `src/main.jsx`: Application bootstrap mounting `<App />` to the root DOM container.
- `src/App.jsx`: Main shell establishing page structure.
- `src/components/Header.jsx`: Hero component accepting `name` and `themeColor` props, rendering action CTA buttons.
- `src/components/About.jsx`: Structural summary displaying academic credentials, bio, and technical focus areas.
- `src/components/Skills.jsx`: Reusable component consuming `skillsByCategory` prop and dynamically mapping them into badge pills.
- `src/components/Footer.jsx`: Reusable footer accepting student `email` prop.

#### Technical Workflow
```
Home.jsx (Parent State/Data)
  ├── Header.jsx (Props: name="Rutvi Arora", themeColor="#2563eb")
  ├── About.jsx (Static presentation)
  ├── Skills.jsx (Props: skillsByCategory={...})
  └── Footer.jsx (Props: email="arorarutvi32@gmail.com")
```

---

### Practical 2 – Week 2: State Management and Routing in React (CO1)

#### Objective
Implement multi-page client-side routing without page reloads using **React Router DOM v7** and establish controlled component state management using React's built-in `useState` hook.

#### Frontend Implementation
- Configured a declarative client-side router (`<Routes>`, `<Route>`) mapping browser URL paths (`/`, `/projects`, `/contact`, `/login`, `/register`) to distinct page components.
- Implemented active route styling in `src/components/Navbar.jsx` using `<NavLink>` to highlight the current section.
- Built a controlled form in `src/components/Contact.jsx` that captures user input in real-time and computes a live character count.
- Implemented a 404 Not Found fallback route (`path="*"`) in `src/pages/Notfound.jsx`.

#### Components and Files Used
- `src/App.jsx`: Configured `<Routes>` and nested `<Route>` definitions.
- `src/components/Navbar.jsx`: Navigation bar rendering brand identity and route links.
- `src/components/Contact.jsx`: Controlled component with `useState` tracking the message length.
- `src/pages/Notfound.jsx`: Catch-all route rendering a friendly error message when invalid URLs are visited.

#### How to Run & Observations
- Navigating between `/`, `/projects`, and `/contact` transitions immediately without full page refreshes.
- Typing into the contact input updates the displayed character counter on every keystroke (`Characters: {message.length}`).

---

### Practical 3 – Week 3: API Integration and Data Rendering in React (CO1)

#### Objective
Connect the React client to an external asynchronous REST API, manage asynchronous lifecycle events using `useEffect`, and provide visual user feedback through explicit loading and error states.

#### Frontend Implementation
- Implemented asynchronous API fetching to retrieve remote datasets.
- Created dedicated visual state feedback components: an animated SVG CSS spinner (`Spinner.jsx`) and a retry-capable error alert (`ErrorMessage.jsx`).
- Implemented client-side search filtering using React's array `.filter()` method to allow instantaneous task filtering by title in memory.

#### Components and Files Used
- `src/components/Projects.jsx`: Main interface managing `tasks`, `loading`, `error`, and `search` states.
- `src/components/Spinner.jsx`: CSS keyframe-animated loader displayed during network round-trips.
- `src/components/ErrorMessage.jsx`: Error display providing an `onRetry` button to re-trigger failed requests.

#### Technical Workflow
1. Component mounts → `useEffect()` triggers `fetchTasks()`.
2. State update: `setLoading(true)`, `setError(null)`.
3. Asynchronous HTTP request dispatched.
4. On success: `setTasks(data)`, `setLoading(false)`.
5. On failure: `setError(err.message)`, `setLoading(false)` → `<ErrorMessage />` rendered.

---

### Practical 4 – Week 4: Building a RESTful API with Node.js and Express (CO2)

#### Objective
Align the frontend data contract and HTTP client methods with the standard RESTful API conventions defined by the Node.js/Express backend.

#### Frontend Implementation
- Created the dedicated HTTP utility module `src/api.js` implementing clean wrapper functions around standard browser `fetch()`.
- Standardized request payload structures to match backend route expectations:
  - `GET /tasks` → Fetches task array.
  - `POST /tasks` → Sends JSON body `{ title, description, priority }`.
  - `PUT /tasks/:id` → Sends update payload `{ completed }`.
  - `DELETE /tasks/:id` → Dispatches deletion query.
- Configured default base URL pointing to the local backend service:
  ```javascript
  const BASE_URL = 'http://localhost:5000';
  ```

#### Components and Files Used
- `src/api.js`: Centralized API service abstraction layer.
- `src/components/Projects.jsx`: Client-side consumer of API service functions.

---

### Practical 5 – Week 5: MongoDB Integration and Schema Design with Mongoose (CO2, CO3)

#### Objective
Update the frontend presentation layer and form controls to reflect the document schema design established in MongoDB via Mongoose.

#### Frontend Implementation
- Updated the task creation form in `src/components/Projects.jsx` to capture all schema fields:
  - `title`: String (required).
  - `description`: String (optional).
  - `priority`: Enum dropdown (`low`, `medium`, `high`).
  - `completed`: Boolean state toggle.
  - `_id`: Unique identifier assigned by MongoDB, used as React list keys (`key={task._id}`).
- Added visual badge badges reflecting task priority with contextual colors:
  - High: Red (`#f87171`)
  - Medium: Yellow (`#fbbf24`)
  - Low: Green (`#34d399`)

#### Components and Files Used
- `src/components/Projects.jsx`: Form inputs, state bindings (`priority`), and dynamic tag rendering.

---

### Practical 6 – Week 6: Full Stack Integration React + Node + MongoDB (CO1, CO2)

#### Objective
Establish an end-to-end full-stack integration connecting the React client (`localhost:5173`), Express API server (`localhost:5000`), and MongoDB Atlas database.

#### Frontend Implementation
- Configured cross-origin resource sharing (CORS) compatibility.
- Implemented full CRUD operational flow from the React interface:
  1. **Create (POST)**: Form submission triggers `createTask()`, appends the new task to the React `tasks` state array without requiring a manual page refresh.
  2. **Read (GET)**: Fetches and displays all stored documents on initial mount.
  3. **Update (PUT)**: "Mark Complete" / "Mark Pending" toggle button sends `PUT /tasks/:id`, updating the visual strikethrough and status tag dynamically.
  4. **Delete (DELETE)**: "Delete" button issues `DELETE /tasks/:id` after window confirmation and filters the removed item out of local state.

#### Components and Files Used
- `src/api.js`: `getTasks`, `createTask`, `updateTask`, `deleteTask`.
- `src/components/Projects.jsx`: Complete interactive task grid.

#### Full Stack Flow
```
[User Action in React Form]
            │
            ▼
    fetch(POST /tasks)
            │
            ▼
   Express API (5000)
            │
            ▼
      Mongoose ODM
            │
            ▼
     MongoDB Database
            │
            ▼
  [201 Created Response]
            │
            ▼
  setTasks([...tasks, newTask])
```

---

### Practical 7 – Week 7: Authentication and Middleware Pipeline (CO2, CO6)

#### Objective
Implement client-side authentication handling, JSON Web Token (JWT) storage, authenticated request injection, and protected route access control.

#### Frontend Implementation
- **User Registration**: Built `src/components/Register.jsx` to submit credentials (`email`, `password`) to `POST /auth/register` and redirect upon success to `/login`.
- **User Login**: Built `src/components/Login.jsx` submitting credentials to `POST /auth/login`. On successful response, saves the received JWT into browser `localStorage.setItem('token', data.token)`.
- **Authenticated Requests**: Configured `src/api.js` to automatically attach the stored token to HTTP request headers:
  ```javascript
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  };
  ```
- **Protected View Redirection**: If a user is not logged in and requests tasks, `Projects.jsx` intercepts the `401 Unauthorized` status and renders a friendly session banner with a direct "Go to Login" button.
- **Dynamic Navigation State**: `src/components/Navbar.jsx` inspects token presence, dynamically rendering a "Logout" button (which clears `localStorage` and redirects) or a highlighted "Login" button.

#### Components and Files Used
- `src/components/Login.jsx`: Login form and JWT credential acquisition.
- `src/components/Register.jsx`: Account registration interface.
- `src/components/Navbar.jsx`: Conditional Auth/Logout buttons.
- `src/api.js`: Header builder injecting `Bearer <token>`.
- `src/components/Projects.jsx`: Unauthorized access fallback state.

---

### Practical 8 – Week 8: Performance Optimization and Lazy Loading in React (CO1)

#### Objective
Optimize initial page load performance, reduce the critical JavaScript transfer payload, and prevent unnecessary bundle parsing by implementing route-based code splitting using `React.lazy()` and `<Suspense>`.

#### Frontend Implementation
- Converted non-critical route component imports (`Projects`, `Contact`, `Login`, `Register`) from static imports to dynamic imports using `React.lazy(() => import(...))`.
- Kept `Home.jsx` statically imported to guarantee zero-latency first paint on the root landing route (`/`).
- Wrapped the `<Routes>` tree inside a `<Suspense>` boundary configured with a custom `<LoadingFallback />` indicator matching the dark-glass UI theme.

#### Code Implementation (`src/App.jsx`)
```jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoadingFallback from './components/LoadingFallback';
import Notfound from './pages/Notfound';
import Footer from './components/Footer';

// Route-based Code Splitting via dynamic imports
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));

function App() {
  return (
    <div id="top">
      <Navbar />
      <div className="page-shell">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Suspense>
        <Footer email="arorarutvi32@gmail.com" />
      </div>
    </div>
  );
}

export default App;
```

#### Verified Bundle & Chunk Analysis (`npm run build`)
```text
dist/index.html                     0.81 kB │ gzip:  0.45 kB
dist/assets/index-BB_Qguig.css      9.25 kB │ gzip:  2.66 kB
dist/assets/Contact-*.js            0.63 kB │ gzip:  0.36 kB
dist/assets/Register-*.js           1.96 kB │ gzip:  1.01 kB
dist/assets/Login-*.js              2.00 kB │ gzip:  1.05 kB
dist/assets/Projects-*.js           9.99 kB │ gzip:  3.20 kB
dist/assets/index-*.js            238.61 kB │ gzip: 76.57 kB
✓ built in ~400ms
```

#### Performance Comparison

| Metric | Before Optimization (Monolithic Bundle) | After Route-Based Lazy Loading | Improvement |
|:---|:---:|:---:|:---:|
| **Initial JS Download** | `~254 kB` | `~238 kB` | **~16 kB offloaded from initial load** |
| **Projects Code** | Bundled in main script | Lazy loaded on `/projects` only (`~9.99 kB`) | On-demand retrieval |
| **Authentication Code** | Bundled in main script | Lazy loaded on `/login` & `/register` (`~4.0 kB`) | On-demand retrieval |
| **Initial Route First Paint** | Delayed by total bundle parse | Immediate render of `Home` component | Zero suspense flash on landing |

---

### Practical 9 – Week 9: In-Memory Caching and Query Optimization (CO2, CO4)

#### Objective
Understand the client-side benefits of backend in-memory caching (`node-cache`) and observe reduced network latency and instantaneous data rendering in the React interface.

#### Frontend's Role & Integration
- **Transparent Consumption**: Caching is executed entirely on the Express backend (`node-cache` with a 60-second TTL). The frontend does not require local cache storage libraries because the HTTP interface remains standard.
- **Observable Latency Drop**:
  - The first task retrieval (`GET /tasks`) incurs full database query latency (~100 ms).
  - Subsequent refreshes or route revisits during the TTL window return in **under 10 ms**, resulting in immediate UI rendering without perceptible loading spinner delays.
- **Cache Invalidation Consistency**: When the React client executes a `POST`, `PUT`, or `DELETE`, the backend automatically flushes the cache keys (`all_tasks`, `task_<id>`). Consequently, subsequent client fetch operations immediately receive fresh data without stale state synchronization issues.

---

### Practical 10 – Week 10: Asynchronous Processing with Event-Driven Architecture (CO4)

#### Objective
Observe non-blocking asynchronous event handling on the client when interacting with backend event-driven architectures (`EventEmitter`).

#### Frontend's Role & Integration
- When the user creates or deletes a task via `Projects.jsx`, the React UI dispatches the standard API request.
- The Express server responds immediately with `201 Created` or `200 OK`, allowing the React application to promptly dismiss the button loading state and display a confirmation alert.
- Behind the scenes, the backend triggers asynchronous background operations (e.g., event logs, email simulation with a 2-second timeout) without blocking the React client's UI thread or delaying the API response.

---

### Practical 11 – Week 11: Containerization with Docker and Docker Compose (CO5)

#### Objective
Containerize the React + Vite frontend into a lightweight, standalone, production-ready container image and orchestrate it within a multi-container network alongside the backend and MongoDB.

#### Frontend Implementation
- Configured a multi-stage `Dockerfile` using Alpine Linux:
  - **Stage 1 (Build)**: Uses `node:22-alpine` to install dependencies and compile the production bundle via `npm run build`.
  - **Stage 2 (Serve)**: Copies compiled assets (`dist/`) into a minimal `node:18-alpine` runner and serves the application on port `5173` bound to `0.0.0.0` using `vite preview`.
- Added `.dockerignore` to prevent uploading `node_modules`, build artifacts, and local logs into the container context.

#### Frontend Dockerfile (`portfolio-24IT002/Dockerfile`)
```dockerfile
# Stage 1: Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production preview serve
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 5173

CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]
```

#### Multi-Container Orchestration (`docker-compose.yml`)
The frontend is defined as the `frontend` service in the root `docker-compose.yml`:
```yaml
frontend:
  build:
    context: ./portfolio-24IT002
    dockerfile: Dockerfile
  container_name: frontend_container
  restart: always
  ports:
    - "5173:5173"
  depends_on:
    - backend
  networks:
    - app-network
```

---

### Practical 12 – Week 12: CI/CD Pipeline with GitHub Actions (CO5)

#### Objective
Participate in automated continuous integration workflows within the multi-repository project structure.

#### Frontend's Role & Integration
- The frontend source code is integrated into the root project repository (`week-4`) where GitHub Actions workflows (`.github/workflows/ci.yml`) automate continuous integration pipelines.
- Code quality is maintained through `oxlint` configuration (`.oxlintrc.json`), enabling instant linting and syntax verification before commits are created.

---

### Practical 13 – Week 13: AI API Integration into a Web Application

#### Objective
Integrate an external Generative AI service into the React task creation workflow. Implement the **AI Task Description Generator** providing context-aware suggestions while enforcing strict loading states, user review capabilities, and responsible AI safeguards.

#### Frontend Implementation
1. **Interactive Trigger**: Added a **"✨ Generate Description"** button styled with modern purple-indigo gradients next to the task title input.
2. **Interactive Loading State**: While the request is in flight, the button is disabled to prevent duplicate submissions and displays an animated inline spinner with `"Generating..."`.
3. **Editable Review Field**: Replaced the standard single-line description input with an expandable `<textarea>`. The AI-generated output is placed directly into the editable field so the user can freely edit, expand, or discard the suggestion before submitting.
4. **Human-in-the-Loop Principle**: The AI suggestion **never** submits or saves the task automatically. The user must manually click `+ Add Task`.
5. **Visual Feedback & Fallback**:
   - On success: Displays a green alert banner (`✓ AI task description generated successfully! You can review and edit it below.`).
   - On upstream failure (e.g., quota limits or missing API keys): Displays a friendly red fallback banner (`⚠️ AI service currently unavailable. Please enter task description manually.`) without crashing the application.
6. **Responsible AI Disclaimer**:
   - Permanently displays an explicit advisory under the description field:
     > *"💡 Disclaimer: AI-generated suggestion: Please review and edit this content before creating your task."*
7. **Privacy Preservation**: The client sends only the task title string to `POST /api/ai/generate-description`. No user credentials, authentication tokens, or personal identifiers are transmitted.

#### Component Code Snippet (`src/components/Projects.jsx`)
```jsx
const handleGenerateDescription = async () => {
  if (!title.trim()) {
    setAiError('Please enter a task title first.');
    setAiMessage(null);
    return;
  }

  setIsGenerating(true);
  setAiError(null);
  setAiMessage(null);

  try {
    const generated = await generateTaskDescription(title.trim());
    setDescription(generated);
    setAiMessage('AI task description generated successfully! You can review and edit it below.');
  } catch (err) {
    setAiError(err.message || 'AI generation failed. Please enter description manually.');
  } finally {
    setIsGenerating(false);
  }
};
```

---

## 5. Getting Started & Setup Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **Backend API Server**: The Express API must be running on `http://localhost:5000` for full functionality.

### 1. Installation
Clone the repository and install dependencies:
```bash
cd portfolio-24IT002
npm install
```

### 2. Environment Configuration
By default, the client communicates with the backend on `http://localhost:5000` as configured in `src/api.js`. Ensure that the Express backend is active and that your backend `.env` contains your `GEMINI_API_KEY` for AI features.

### 3. Running Locally (Development Mode)
Start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### 4. Running Code Quality Linter
Run Oxlint to perform fast static code analysis:
```bash
npm run lint
```

### 5. Building for Production
Compile optimized static assets into the `dist/` directory:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### 6. Running with Docker
To build and run the frontend container independently:
```bash
# Build the Docker image
docker build -t task-manager-frontend .

# Run the container mapping host port 5173 to container port 5173
docker run -p 5173:5173 --name frontend_container task-manager-frontend
```

Alternatively, launch the complete multi-container stack from the root directory:
```bash
docker compose up --build -d
```

---

## 6. Directory Structure

```
portfolio-24IT002/
├── .dockerignore                 # Excluded files during Docker build
├── .gitignore                    # Git ignored dependencies and build output
├── .oxlintrc.json                # Oxlint linter rules and configuration
├── Dockerfile                    # Multi-stage production container build
├── index.html                    # Root HTML document and meta tags
├── package.json                  # Manifest, scripts, and dependencies
├── vite.config.js                # Vite build configuration and React plugin
├── docs/                         # Lab demonstration screenshots and evidence
│   ├── build-output.png
│   ├── contact-chunk-load.png
│   ├── home-route.png
│   ├── performance-metrics.png
│   └── projects-chunk-load.png
└── src/
    ├── main.jsx                  # Application entry point mounting React root
    ├── App.jsx                   # Main layout, Suspense boundary, and Routes
    ├── App.css                   # Global layout styling
    ├── index.css                 # CSS variables, glassmorphic themes, animations
    ├── api.js                    # Centralized fetch API service layer
    ├── assets/                   # Static icons and graphics
    ├── pages/
    │   └── Notfound.jsx          # 404 Route fallback view
    └── components/
        ├── Header.jsx            # Hero section with name and CTA
        ├── About.jsx             # Bio, education, and career interests
        ├── Skills.jsx            # Categorized technical skill pills
        ├── Contact.jsx           # Controlled contact message form
        ├── Projects.jsx          # Task Management UI, CRUD operations & AI generator
        ├── Login.jsx             # JWT Authentication login form
        ├── Register.jsx          # New user registration form
        ├── Navbar.jsx            # Dynamic navigation bar with auth toggle
        ├── Footer.jsx            # Application footer with contact details
        ├── Spinner.jsx           # Reusable CSS keyframe loading spinner
        ├── ErrorMessage.jsx      # Reusable error alert with retry button
        └── LoadingFallback.jsx   # Suspense loading view during chunk download
```

---

## 7. Author Information

- **Student:** Rutvi Arora  
- **ID / Roll No:** 24IT002  
- **Degree:** Bachelor of Technology (B.Tech) — Information Technology  
- **Institution:** Chandubhai S. Patel Institute of Technology (CSPIT), CHARUSAT University  
- **Email:** arorarutvi32@gmail.com  
