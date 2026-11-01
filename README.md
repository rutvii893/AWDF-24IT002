# AWDF – Task Management Application

[![CI Pipeline](https://github.com/rutvii893/AWDF-24IT002/actions/workflows/ci.yml/badge.svg)](https://github.com/rutvii893/AWDF-24IT002/actions/workflows/ci.yml)
[![Node.js Version](https://img.shields.io/badge/Node.js-18%20%7C%2020%20%7C%2022-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-19.2.7-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express Version](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Version](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose%20v3.8-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

**Course:** Advanced Web Development Frameworks (AWDF) / ITUE301  
**Student:** Rutvi Arora  
**Roll No:** 24IT002  
**Institute:** Chandubhai S. Patel Institute of Technology (CSPIT), CHARUSAT University  

---

## 1. Project Overview

This repository consolidates the entire full-stack **Task Management Application & Engineering Portfolio** developed progressively across **Practical 1 to Practical 13**. It contains both the complete React 19 frontend and the Express 5 / MongoDB backend in an integrated monorepo architecture while preserving full Git commit history from the original development repositories.

### Key Highlights
- **Single Source of Truth**: Unified repository holding `frontend/`, `backend/`, root Docker Compose orchestration, and automated CI workflows.
- **Full Historical Integrity**: Preserved original commit histories, messages, authors, and timestamps from both `portfolio-24IT002` and `task-manager-api-24IT002`.
- **Modern Full-Stack Capabilities**:
  - Full CRUD operations with MongoDB Atlas and Mongoose.
  - JWT Authentication with bcrypt password hashing and token persistence.
  - Route-level code splitting using `React.lazy()` and `<Suspense>`.
  - In-memory response caching using `node-cache` (TTL 60s) with automatic write invalidation.
  - Asynchronous EventEmitter notifications pipeline.
  - Multi-container containerization with Docker & Docker Compose.
  - Automated Continuous Integration (CI) with GitHub Actions.
  - Context-aware **AI Task Description Generator** powered by Google Gemini API (`gemini-2.5-flash`).

---

## 2. Technology Stack

| Domain | Technology / Tool | Version | Description |
|:---|:---|:---|:---|
| **Frontend Framework** | React.js | `^19.2.7` | UI library, declarative components, hooks-based state management |
| **Frontend Bundler** | Vite | `^8.1.1` | Next-gen dev server with HMR and Rollup-based production chunking |
| **Client Routing** | React Router DOM | `^7.18.1` | Declarative SPA navigation and dynamic route transitions |
| **Backend Runtime** | Node.js | `>=18.0.0` | Server-side JavaScript runtime environment |
| **Backend Framework** | Express.js | `^5.2.1` | RESTful API server, routing, and middleware pipeline |
| **Database & ODM** | MongoDB & Mongoose | `6.0` / `^9.9.1` | NoSQL document database and schema modeling |
| **Authentication** | JWT & bcryptjs | `^9.0.3` / `^3.0.3` | JSON Web Token issuance/verification and secure password hashing |
| **In-Memory Caching** | node-cache | `^5.1.2` | Fast in-memory caching with TTL (60s) for query optimization |
| **Asynchronous Events** | Node.js EventEmitter | Native | Decoupled event-driven task notifications |
| **Artificial Intelligence** | Google Gemini API | `gemini-2.5-flash` | Official `@google/genai` SDK for task description generation |
| **Containerization** | Docker & Docker Compose | `v3.8` | Multi-container orchestration (MongoDB, backend, frontend) |
| **Automated Testing** | Jest & Supertest | `^30.5.2` / `^7.3.1`| Automated unit and integration testing suite |
| **CI/CD** | GitHub Actions | `v4` | Automated testing and build pipeline triggered on push to `main` |

---

## 3. Architecture & Data Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        React 19 Frontend (Vite)                        │
│  - Port: 5173                                                          │
│  - Routes: /, /projects, /github-projects, /contact, /login, /register │
│  - HTTP Client: fetch() abstraction in src/api.js                      │
│  - Code Splitting: React.lazy() + Suspense                             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST / JSON
                                    │ Authorization: Bearer <JWT>
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Express.js Backend API                          │
│  - Port: 5000                                                          │
│  - Middleware: CORS, JSON parser, JWT auth, client rate-limiter        │
│  - Caching Layer: node-cache (TTL 60s) with write invalidation         │
│  - Event Pipeline: EventEmitter for task-created / task-deleted events │
└───────────────────┬─────────────────────────────────┬──────────────────┘
                    │ Mongoose ODM                    │ SDK Request
                    ▼                                 ▼
┌───────────────────────────────────┐ ┌──────────────────────────────────┐
│             MongoDB               │ │      Google Gemini API           │
│  - Port: 27017 or Atlas Cluster   │ │  - Model: gemini-2.5-flash       │
│  - Collections: users, tasks      │ │  - 1-2 sentence description gen  │
└───────────────────────────────────┘ └──────────────────────────────────┘
```

---

## 4. Repository Folder Structure

```text
AWDF-24IT002/
├── .github/
│   └── workflows/
│       └── ci.yml                # Consolidated GitHub Actions CI pipeline
├── backend/                      # Express.js REST API server
│   ├── config/
│   │   └── cache.js              # node-cache configuration (TTL: 60s)
│   ├── docs/                     # Practical documentation & guides
│   ├── middleware/
│   │   ├── auth.js               # JWT verification middleware
│   │   └── validateTask.js       # Request body validation middleware
│   ├── models/
│   │   ├── Task.js               # Mongoose Task schema (title, priority, completed)
│   │   └── User.js               # Mongoose User schema (email, password hash)
│   ├── routes/
│   │   ├── aiRoutes.js           # POST /api/ai/generate-description (Gemini)
│   │   ├── authRoutes.js         # POST /auth/register, POST /auth/login
│   │   └── taskRoutes.js         # GET, POST, PUT, DELETE /tasks
│   ├── services/
│   │   └── aiService.js          # Google Gemini API integration (@google/genai)
│   ├── tests/
│   │   ├── ai.test.js            # Automated tests for Gemini AI endpoint
│   │   ├── auth.test.js          # Automated tests for auth routes
│   │   └── tasks.test.js         # Automated tests for task CRUD endpoints
│   ├── Dockerfile                # Backend container definition (node:22-alpine)
│   ├── events.js                 # Shared EventEmitter instance
│   ├── listeners.js              # Event listeners for notifications
│   ├── package.json              # Backend dependencies and scripts
│   └── server.js                 # Express application entry point
├── frontend/                     # React.js + Vite client application
│   ├── public/                   # Static assets & icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx        # Hero component
│   │   │   ├── About.jsx         # Academic bio & skills
│   │   │   ├── Skills.jsx        # Categorized skill pills
│   │   │   ├── Contact.jsx       # Controlled contact form
│   │   │   ├── Projects.jsx      # Task Management UI, CRUD & AI Generator
│   │   │   ├── Login.jsx         # JWT login form
│   │   │   ├── Register.jsx      # Account registration form
│   │   │   ├── Navbar.jsx        # Responsive navigation bar
│   │   │   ├── Footer.jsx        # Page footer
│   │   │   ├── Spinner.jsx       # Reusable CSS loading spinner
│   │   │   ├── ErrorMessage.jsx  # Reusable error alert with retry
│   │   │   └── LoadingFallback.jsx # Suspense chunk download indicator
│   │   ├── practical3/           # Practical 3 GitHub API components
│   │   │   └── GithubProjects.jsx
│   │   ├── pages/
│   │   │   └── Notfound.jsx      # 404 Route view
│   │   ├── api.js                # Centralized API service layer
│   │   ├── App.jsx               # Routes & Suspense boundary
│   │   ├── index.css             # Glassmorphism design & animations
│   │   └── main.jsx              # React DOM entry point
│   ├── Dockerfile                # Multi-stage production container build
│   ├── package.json              # Frontend dependencies and scripts
│   └── vite.config.js            # Vite build configuration
├── docs/                         # Lab demonstration guides & screenshots
│   ├── practical-12-cicd.md      # Practical 12 documentation
│   ├── practical-13-ai-integration.md # Practical 13 documentation
│   └── screenshots/              # Evidence screenshots
├── .env.example                  # Environment template for local and Docker setups
├── .gitignore                    # Git ignore rules for node_modules, .env, and dist
└── docker-compose.yml            # Multi-container orchestration (frontend, backend, mongo)
```

---

## 5. Practical-Wise Implementation Index (Practicals 1–13)

| Practical | Academic Focus | Implementation Details |
|:---:|:---|:---|
| **Practical 1** | Introduction to React & Component Architecture (CO1) | Modular UI decomposed into reusable components (`Header`, `About`, `Skills`, `Footer`) using unidirectional data flow and props. |
| **Practical 2** | State Management & Routing in React (CO1) | Multi-page client-side SPA routing with React Router DOM v7 (`/`, `/projects`, `/contact`, `/login`, `/register`) and controlled input state with live character count in `Contact.jsx`. |
| **Practical 3** | API Integration & Data Rendering in React (CO1) | Asynchronous GitHub API integration in `practical3/GithubProjects.jsx` with loading spinners (`Spinner.jsx`) and error handling with retries (`ErrorMessage.jsx`). |
| **Practical 4** | Building a RESTful API with Node.js & Express (CO2) | Built Express.js backend with full RESTful CRUD routing (`GET`, `POST`, `PUT`, `DELETE` on `/tasks`), error handling, and logger middleware. |
| **Practical 5** | MongoDB Integration & Schema Design with Mongoose (CO2, CO3) | Connected Express to MongoDB Atlas using Mongoose. Created `Task` schema with validation (`title`, `description`, `priority` enum: `low`/`medium`/`high`, `completed`). |
| **Practical 6** | Full Stack Integration React + Node + MongoDB (CO1, CO2) | Connected React frontend with Express backend via CORS. Enabled full-stack CRUD: live task creation, real-time list rendering, status toggling, and deletion. |
| **Practical 7** | Authentication & Middleware Pipeline (CO2, CO6) | User registration & login with bcrypt password hashing and JWT token issuance. Client persists token in `localStorage` and attaches `Authorization: Bearer <token>` to requests. |
| **Practical 8** | Performance Optimization & Lazy Loading in React (CO1) | Route-level code splitting using `React.lazy()` and `<Suspense>` with a custom `<LoadingFallback />`. Offloaded ~16 kB of non-critical JavaScript from the initial bundle. |
| **Practical 9** | In-Memory Caching & Query Optimization (CO2, CO4) | Implemented server-side caching using `node-cache` (TTL: 60s). Decreased repeated query latency from ~100 ms to under 10 ms with automatic cache invalidation on write operations. |
| **Practical 10** | Asynchronous Processing with Event-Driven Architecture (CO4) | Decoupled task creation from background notification processing using Node.js `EventEmitter`. Tasks emit `task-created` and `task-deleted` events handled asynchronously without blocking HTTP responses. |
| **Practical 11** | Containerization with Docker & Docker Compose (CO5) | Created Dockerfiles for backend and frontend (multi-stage Alpine). Orchestrated backend, frontend, and MongoDB services on an isolated bridge network with health checks. |
| **Practical 12** | CI/CD Pipeline with GitHub Actions (CO5) | Configured automated CI workflow (`.github/workflows/ci.yml`) triggering on pushes to `main`. Provisions Ubuntu runner, installs dependencies, executes backend tests (`npm test`), and verifies frontend build (`npm run build`). |
| **Practical 13** | AI API Integration into a Web Application | Integrated Google Gemini API (`gemini-2.5-flash`) via `@google/genai` SDK. Implemented "✨ Generate Description" button, loading spinner, editable `<textarea>`, client rate-limiting, and graceful 503 fallback. |

---

## 6. Installation & Setup Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **Docker Desktop** (optional, for containerized execution)
- **MongoDB**: Local MongoDB instance or free MongoDB Atlas cluster
- **Google Gemini API Key**: Free key from [Google AI Studio](https://aistudio.google.com/apikey)

### 1. Clone the Repository
```bash
git clone https://github.com/rutvii893/AWDF-24IT002.git
cd AWDF-24IT002
```

### 2. Environment Configuration
Create a `.env` file inside the `backend/` directory based on `.env.example`:
```bash
cp .env.example backend/.env
```
Open `backend/.env` and configure your credentials:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=supersecretjwtkey123
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxx
```
> [!NOTE]
> `.env` files are strictly ignored by `.gitignore` to prevent credential exposure.

---

## 7. How to Run the Application

### Option A: Local Development (Recommended for Development)

#### 1. Start the Backend API Server
```bash
cd backend
npm install
npm run dev
# or: node server.js
```
The backend server runs at `http://localhost:5000`.

#### 2. Start the Frontend Client
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The React frontend runs at `http://localhost:5173`. Open your browser and navigate to `http://localhost:5173`.

---

### Option B: Running with Docker Compose (Full-Stack Containerization)

Ensure Docker Desktop is running on your machine, then run:

```bash
# Build and start all 3 containers (mongodb, backend, frontend) in detached mode
docker compose up --build -d

# Check running containers
docker compose ps

# View live container logs
docker compose logs -f

# Stop and remove containers
docker compose down
```

**Port Mapping in Docker:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- MongoDB: `localhost:27017`

---

## 8. API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|:---|:---|:---|:---:|
| `POST` | `/auth/register` | Register a new user account | No |
| `POST` | `/auth/login` | Authenticate user & return JWT token | No |
| `GET` | `/auth/me` | Fetch authenticated user profile | **Yes** |
| `GET` | `/tasks` | Retrieve all tasks (Cached with `node-cache`) | **Yes** |
| `GET` | `/tasks/:id` | Retrieve single task by ID (Cached) | **Yes** |
| `POST` | `/tasks` | Create new task (Invalidates cache & emits event) | **Yes** |
| `PUT` | `/tasks/:id` | Update task details / completed status | **Yes** |
| `DELETE` | `/tasks/:id` | Delete task by ID | **Yes** |
| `GET` | `/tasks/debug/cache` | Inspect cache hits and misses stats | **Yes** |
| `POST` | `/api/ai/generate-description` | Generate task description with Google Gemini | No (Rate-limited) |

---

## 9. Testing & Quality Verification

### 1. Run Automated Backend Tests
The backend contains automated tests using **Jest** and **Supertest** covering task CRUD operations, login authentication error handling, and Gemini AI fallback behavior:

```bash
cd backend
npm test
```

**Expected Test Output:**
```text
PASS tests/tasks.test.js
PASS tests/auth.test.js
PASS tests/ai.test.js

Test Suites: 3 passed, 3 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Ran all test suites.
```

### 2. Run Frontend Production Build & Linter
```bash
cd frontend
npm run lint
npm run build
```

---

## 10. Author Information

- **Student Name:** Rutvi Arora  
- **Enrollment / ID:** 24IT002  
- **Program:** Bachelor of Technology (B.Tech) – Information Technology  
- **Course:** Advanced Web Development Frameworks (AWDF) / ITUE301  
- **Institution:** Chandubhai S. Patel Institute of Technology (CSPIT), CHARUSAT University  
- **Email:** arorarutvi32@gmail.com  

