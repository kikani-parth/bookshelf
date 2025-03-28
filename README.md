# Bookshelf - Book Tracking Application 📚

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

## Demo ▶️

### Authentication
<img src="https://github.com/user-attachments/assets/3038283e-5a0f-4c13-9243-e34daf259bec" width="200" alt="Registration GIF">

_**The user can login/register using just the username and password.**_

<br>

### Add books to Reading List
<img src="https://github.com/user-attachments/assets/7b81d302-4e63-4aea-9b4e-7c4cf4dec188" width="200" alt="Add books to Reading List GIF">

_**Users can search their favourite books and add them to reading list.**_

<br>

### Mark books as finished
<img src="https://github.com/user-attachments/assets/2500aef3-be6e-42d7-801b-0f6a5ee69c8b" width="200" alt="Add books to Reading List GIF">

_**The GIF shows the Readng List Screen where users can see all of their books marked as 'reading'. When tapped on a book, users can see the detailed view of that book and mark a book as 'finished'.**_

<br>

### Remove book
<img src="https://github.com/user-attachments/assets/7b08bf28-5063-43e7-aa3d-4039b036008d" width="200" alt="Add books to Reading List GIF">

_**The user can remove the book from reading list and also from finished reading if needed.**_

<br>

### Re-Login
<img src="https://github.com/user-attachments/assets/63b707ea-7bee-475a-9552-cfdd815f55a1" width="200" alt="Add books to Reading List GIF">

_**When the user is logged out, the data (reading list and finished reading list) will still persist as the app stores them in a PostgreSQL Database.**_

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

## API Reference 🔧

### Authentication

#### Register a New User

```http
  POST /api/auth/register
```

| Parameter  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `username` | `string` | **Required**. Required. The user's username |
| `password` | `string` | **Required**. The user's password           |


#### User Login

```http
  POST /api/auth/login
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**. The user's username |
| `password` | `string` | **Required**. The user's password |


### Books

#### Search Books

```http
  GET /api/books/search?query={query}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `query`   | `string` | **Required**. The search query for books |


#### Add a Book to Database

```http
  POST /api/books
```

| Parameter       | Type     | Description                                                                                |
| :-------------- | :------- | :----------------------------------------------------------------------------------------- |
| `id`            | `string` | **Required**. The id of the book                                                           |
| `title`         | `string` | **Required**. The title of the book                                                        |
| `author`        | `string` | Optional. The author of the book                                                           |
| `description`   | `string` | Optional. The description of the book                                                      |
| `cover_image`   | `string` | Optional. The Book's image url                                                             |
| `publishedDate` | `string` | Optional. The Book's publication date                                                      |
| `status`        | `string` | Optional. The status of the book (e.g., 'reading', 'finished'). Default status = 'reading' |



#### Get all Books

```http
  GET /api/books
```
_No parameters required._

#### Get User's Books according to status

```http
  GET /api/books?status={status}
```

| Parameter | Type     | Description                                                        |
| :-------- | :------- | :----------------------------------------------------------------- |
| `status`  | `string` | **Required**. The status of the book (e.g., 'reading', 'finished') |


#### Update Book Status

```http
  PUT /api/books/{id}/status
```

| Parameter | Type     | Description                                            |
| :-------- | :------- | :----------------------------------------------------- |
| `id`      | `string` | **Required**. The ID of the book to update             |
| `author`  | `string` | **Required**. New status (e.g., "reading", "finished") |


#### Remove a Book

```http
  DELETE /api/books/{id}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `id`      | `string` | **Required**. The ID of the book to remove |
