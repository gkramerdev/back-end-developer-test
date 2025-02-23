import express, { Application } from 'express';
import userRouter from '../routes/user.routes';

const createExpressApp = (app: Application): void => {
  app.use(express.json());
  app.use('/api', userRouter);
};

export { createExpressApp };
