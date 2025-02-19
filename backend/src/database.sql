CREATE DATABASE bookshelf;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE books (
    id VARCHAR(255),
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image VARCHAR(255),
    published_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'reading',
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id, user_id)
); 