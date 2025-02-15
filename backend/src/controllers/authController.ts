import { Request, Response } from 'express';
import pool from '../config/db';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );

    // Generate a JWT token for the new user
    const token = generateToken(result.rows[0].id);

    // Send the token back to the client
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    // Query the database to find the user by username
    const result = await pool.query('SELECT * FROM users WHERE username =$1', [
      username,
    ]);

    // If no user is found, return an error
    if (result.rows.length === 0) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    // Extract the hashed password and user ID from the query result
    const { password: hashedPassword, id } = result.rows[0];

    // Compare the provided password with the hashed password
    const isValid = await comparePassword(password, hashedPassword);

    if (!isValid) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken(id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}
