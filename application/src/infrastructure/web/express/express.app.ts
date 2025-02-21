import express, { Application } from 'express';
import { orderRoutes } from '@infrastructure/web/express/routes/order.routes';

const createExpressApp = (app: Application): void => {
  app.use(express.json());
  app.use('/orders', orderRoutes);
};

export { createExpressApp };
