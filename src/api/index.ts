import express, { Request, Response, NextFunction } from 'express';
import user from './user.api';

const app = express();

// Define a type for user API if necessary (for example, if it's a router or middleware)
app.use('/user', user);

export default app;
