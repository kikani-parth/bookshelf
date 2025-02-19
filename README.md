# Bookshelf - Book Tracking Application 📚

[![PERN Stack](https://img.shields.io/badge/stack-PERN-%2300f.svg?style=flat&logo=postgresql&logoColor=white)](https://postgresql.org)
[![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactnative.dev)

Bookshelf is a mobile application that helps users track their reading progress. Built with the PERN stack (PostgreSQL, Express, React Native, and Node.js) using TypeScript, it allows users to search books, manage reading lists, and track finished books.

## Features ✨
- **Book Discovery**: Search books using Google Books API
- **Reading Management**:
  - Add books to Reading List
  - Mark books as finished
  - Remove books from lists
- **User Authentication**: JWT-based secure login/registration
- **Persistent Storage**: PostgreSQL database for user data and book tracking
- **Responsive UI**: Mobile-first design with smooth navigation
- **Cross-Platform**: Works on both iOS and Android

## Tech Stack 🛠️
**Frontend**:
- React Native (Expo)
- TypeScript
- React Navigation
- React Context API
- Axios

**Backend**:
- Node.js
- Express
- PostgreSQL
- JSON Web Tokens (JWT)
- Google Books API

## Getting Started 🚀

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v15+)
- Expo CLI
- Google Books API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kikani-parth/bookshelf.git
cd bookshelf
```
2. **Backend setup**
```
cd backend
npm install
```
3. **Frontend setup**
```
cd ../frontend
npm install
```

### Configuration
**Backend Environment Variables (backend/.env)**
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=bookshelf
JWT_SECRET=your_jwt_secret
GOOGLE_BOOKS_API_KEY=your_api_key
```

### API Reference 🔧

**Authentication**
```
POST /api/auth/register - User registration

POST /api/auth/login - User login
```

**Books**
```
GET /api/books/search?query=... - Search books

POST /api/books - Add to reading list

GET /api/books - Get user's books

PUT /api/books/:id/status - Update book status

DELETE /api/books/:id - Remove book
```
