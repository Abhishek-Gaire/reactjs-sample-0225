# Task Board Application

A full-stack task management application built with React frontend and Node.js/Express backend.

## 🚀 Features

- **Task Management**: Create, read, update, and delete tasks
- **Kanban Board**: Drag-and-drop interface with columns (To Do, In Progress, Done)
- **Search & Filter**: Find tasks by title/description and filter by status
- **Analytics Dashboard**: Track productivity with charts and statistics
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Profile Management**: User profiles with random Picsum photos
- **Real-time Updates**: Live notifications for all actions

## 🛠️ Tech Stack

### Frontend

- **React** - UI library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Fetch API** - HTTP requests

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **UUID** - Unique ID generation
- **CORS** - Cross-origin resource sharing
- **Node-fetch** - HTTP client for external API calls

## 🌐 API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks (with optional filtering)
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Analytics

- `GET /api/analytics` - Get task statistics
