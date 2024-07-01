import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model'; // Assuming you have a user model interface defined

require('dotenv').config();

// Define custom errors for TypeScript
class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

// Authentication middleware
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    if (token) {
      const decoded = await jwt.verify(token, process.env.secretTokenKey as string) as IUser; // Assuming IUser is your user interface
      req.body.user = decoded;
      next();
    } else {
      throw new UnauthorizedError('Unauthorized');
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: 'Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError || error instanceof UnauthorizedError) {
      return res.status(401).json({ msg: 'Invalid token' });
    } else {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
};

// Authorization middleware
const authorize = (allowedUserTypes: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userType = (req.body.user as IUser)?.userType || ''; // Extract userType from the decoded token

    if (allowedUserTypes.includes(userType)) {
      req.body.productSupplier = (req.body.user as IUser)?._id; // Assuming _id is present in your user interface
      next(); // User type is allowed, proceed to the next middleware
    } else {
      return res.status(403).json({ msg: 'Forbidden: Access is denied' });
    }
  };
};

export { auth, authorize };
