import { Response } from 'express';

interface Payload {
  [key: string]: any; // Define any structure for the payload if needed
}

interface ErrorResponseOptions {
    msg: string;
  }
  
  const ErrorResponse = (res: Response, status: number, error: ErrorResponseOptions) => {
    res.status(status).json({ error: error.msg });
  };

const JSONResponse = (res: Response, status: number, payload: Payload) => {
  res.status(status).json(payload);
};


export { JSONResponse, ErrorResponse };
