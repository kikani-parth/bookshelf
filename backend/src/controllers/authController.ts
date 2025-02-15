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

    console.log(result);
    // Generate a JWT token for the new user
    const token = generateToken(result.rows[0].id);

    // Send the token back to the client
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}
