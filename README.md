# Task Management Application

A full-stack task management application built with modern web technologies, featuring secure authentication and a clean, responsive UI.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Security Features](#security-features)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with access & refresh tokens
- 📝 **Task Management** - Create, read, update tasks with status and priority
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🔒 **User Isolation** - Users can only access their own tasks
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Real-time State Management** - Redux Toolkit for predictable state updates
- 🛡️ **Type Safety** - Full TypeScript implementation on both frontend and backend
- 🍪 **Secure Cookies** - HttpOnly cookies for token storage (XSS protection)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Docker Desktop** - Required for running PostgreSQL database
  - **macOS**: [Download Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - **Windows**: [Download Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - **Linux**: [Download Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)
  
  After installation, make sure Docker Desktop is running before proceeding with the setup.
  
- **npm** or **yarn** - Package manager (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nadscarim/task-management.git
   cd task-management
   ```

2. **Install dependencies**
   
   **Backend:**
   ```bash
   cd server
   npm install
   ```
   
   **Frontend:**
   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` file in the `server` directory:
   ```env
   # Database Configuration
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=task_management
   DATABASE_URL=postgresql://postgres:postgres@localhost:51213/task_management
   
   # JWT Configuration
   JWT_ACCESS_SECRET=your_access_token_secret_change_this_in_production
   JWT_REFRESH_SECRET=your_refresh_token_secret_change_this_in_production
   JWT_ACCESS_EXPIRES_IN=6h
   JWT_REFRESH_EXPIRES_IN=7d
   
   # Server Configuration
   NODE_ENV=development
   PORT=8080
   ```
   
   > **⚠️ Security Note:** Make sure to change the JWT secrets to strong, random values in production!

4. **Set up the database with Docker Compose**
   
   **⚠️ Important:** Make sure Docker Desktop is running before executing these commands.
   
   The project includes a `docker-compose.yml` file for easy database setup:
   
   ```yaml
   services:
     postgres:
       image: postgres:latest
       container_name: postgres
       environment:
         POSTGRES_USER: ${POSTGRES_USER}
         POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
         POSTGRES_DB: ${POSTGRES_DB}
       ports:
         - "51213:5432"
       env_file:
         - .env
   ```
   
   **Start the database container:**
   ```bash
   docker compose up -d
   ```
   
   **Verify the database is running:**
   ```bash
   docker ps
   ```
   
   You should see a container named `postgres` with status `Up`.
   
   **Stop the database:**
   ```bash
   docker compose down
   ```
   
   **View logs:**
   ```bash
   docker compose logs -f postgres
   ```

5. **Initialize the database schema**
   
   Generate Prisma Client:
   ```bash
   npx prisma generate
   ```
   
   Create and apply the initial migration:
   ```bash
   npx prisma migrate dev --name initial_schema
   ```
   
   This will:
   - Create a `prisma/migrations` folder with your migration history
   - Apply the schema to your database
   - Generate the Prisma Client
   
   > **Note:** We use `prisma migrate dev` to create version-controlled migration files. This is the recommended approach for production-ready applications as it tracks all schema changes and makes deployments safer.

6. **Run the application**
   
   **Backend (from server directory):**
   ```bash
   npm run dev
   ```
   
   **Frontend (from client directory):**
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8080`
   - Database: `localhost:51213`

## 📁 Project Structure

```
task-management/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── shared/   # Shared/common components
│   │   │   └── tasks/    # Task-related components
│   │   ├── core/
│   │   │   ├── interface/ # TypeScript interfaces
│   │   │   ├── layout/    # Layout components (Navbar)
│   │   │   ├── store/     # Redux store & slices
│   │   │   └── utils/     # Utility functions
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   └── package.json
│
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Server entry point
│   ├── prisma/
│   │   ├── migrations/    # Database migration history (git tracked)
│   │   └── schema.prisma  # Database schema
│   ├── .env               # Environment variables
│   ├── docker-compose.yml # Docker configuration for PostgreSQL
│   └── package.json
│
└── README.md
```

## 🔧 Useful Commands

### Docker Commands
```bash
# Start the database
docker compose up -d

# Stop the database
docker compose down

# View database logs
docker compose logs -f postgres

# Restart the database
docker compose restart

# Remove database and volumes (⚠️ deletes all data)
docker compose down -v
```

### Prisma Commands

#### Development Workflow
```bash
# Generate Prisma Client (run after installing dependencies)
npx prisma generate

# Create and apply a new migration (after changing schema.prisma)
npx prisma migrate dev --name descriptive_name

# Examples:
npx prisma migrate dev --name add_user_avatar
npx prisma migrate dev --name add_task_categories
npx prisma migrate dev --name update_task_status_enum

# Open Prisma Studio (visual database editor)
npx prisma studio

# Reset database and apply all migrations (⚠️ deletes all data)
npx prisma migrate reset
```

#### Production Deployment
```bash
# Apply pending migrations in production (safe, no prompts)
npx prisma migrate deploy

# Generate Prisma Client (in production environment)
npx prisma generate
```

#### Prototyping (Not Recommended for Production)
```bash
# Quickly sync schema to database without creating migrations
# Use only for prototyping or local experiments
npx prisma db push
```

### Why Use Migrations?

**`prisma migrate dev`** (Recommended):
- ✅ Creates version-controlled migration files
- ✅ Trackable schema history in git
- ✅ Safe deployments to production
- ✅ Team collaboration - everyone applies same migrations
- ✅ Can review schema changes in pull requests

**`prisma db push`** (Prototyping only):
- ⚡ Quick for rapid prototyping
- ❌ No migration history
- ❌ Can't track what changed
- ❌ Not suitable for production
- ❌ Difficult for team collaboration

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| POST | `/api/v1/auth/logout` | Logout user | No |
| POST | `/api/v1/auth/refresh` | Refresh access token | No |
| GET | `/api/v1/auth/me` | Get current user | Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/tasks` | Get all user tasks | Yes |
| GET | `/api/v1/tasks/:id` | Get task by ID | Yes |
| POST | `/api/v1/tasks` | Create new task | Yes |
| PUT | `/api/v1/tasks/:id` | Update task | Yes |

### Request/Response Examples

**Register User**
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Create Task**
```bash
POST /api/v1/tasks
Content-Type: application/json
Cookie: accessToken=xxx; refreshToken=xxx

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-12-31"
}
```

## 🔐 Environment Variables

### Server (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_USER` | Database username | `postgres` |
| `POSTGRES_PASSWORD` | Database password | `postgres` |
| `POSTGRES_DB` | Database name | `task_management` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:51213/task_management` |
| `JWT_ACCESS_SECRET` | Secret for access tokens | `your_access_token_secret_change_this_in_production` |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | `your_refresh_token_secret_change_this_in_production` |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiration time | `6h` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration time | `7d` |
| `PORT` | Server port | `8080` |
| `NODE_ENV` | Environment mode | `development` or `production` |

> **Note:** The `docker-compose.yml` file uses the same `.env` file for database configuration. Make sure the `DATABASE_URL` matches your Docker Compose port mapping (51213:5432).

### Client

Create `.env` in the client directory if you need to configure API URL:
```env
VITE_API_URL=http://localhost:8080
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: Dual-token system (access + refresh)
- **HttpOnly Cookies**: Prevents XSS attacks
- **SameSite Cookies**: Prevents CSRF attacks
- **User Isolation**: Users can only access their own data
- **Token Expiry**: 
  - Access tokens: 6 hours
  - Refresh tokens: 7 days
- **Refresh Token Storage**: Stored in database for revocation capability

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id            String         @id @default(cuid())
  email         String         @unique
  name          String
  password      String
  role          Role           @default(USER)
  tasks         Task[]
  refreshTokens RefreshToken[]
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
}
```

### Task Model
```prisma
model Task {
  id          String     @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  userId      String
  user        User       @relation(fields: [userId], references: [id])
  deletedAt   DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

### Enums
- **Role**: `USER`, `ADMIN`
- **TaskStatus**: `TODO`, `IN_PROGRESS`, `DONE`, `CANCELLED`
- **Priority**: `LOW`, `MEDIUM`, `HIGH`

## 🔄 Authentication Flow

```
1. User registers/logs in
   ↓
2. Server generates JWT access token (15 min) and refresh token (7 days)
   ↓
3. Tokens stored in HttpOnly cookies
   ↓
4. Client makes authenticated requests with cookies
   ↓
5. Middleware verifies access token
   ↓
6. If access token expires, use refresh token to get new access token
   ↓
7. If refresh token expires, user must log in again
```

## 🧪 Testing

### Run tests (if implemented)
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 📦 Deployment

### Backend Deployment

1. Set environment variables in your hosting platform
2. Build the application:
   ```bash
   npm run build
   ```
3. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```
4. Apply database migrations:
   ```bash
   npx prisma migrate deploy
   ```
   
   > **Important:** Use `migrate deploy` (not `migrate dev`) in production. It applies pending migrations without prompts or schema drift checks.
   
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Deployment

1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting platform (Vercel, Netlify, etc.)

### Recommended Platforms
- **Backend**: Railway, Render, Heroku, DigitalOcean
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Database**: Supabase, Railway, Neon

## 🚧 Roadmap

- [ ] Task deletion functionality
- [ ] Task filtering and search
- [ ] Task categories/tags
- [ ] Dark mode support
- [ ] Email notifications
- [ ] Task sharing/collaboration
- [ ] Mobile app (React Native)
- [ ] Real-time updates (WebSockets)
- [ ] Task attachments
- [ ] Recurring tasks

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use TypeScript for all new code
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## 📞 Support

If you have any questions or need help, please open an issue or contact me at your.email@example.com

---

**⭐ If you found this project helpful, please give it a star!**
