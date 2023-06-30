import express from 'express';
import morgan from 'morgan';

import messageRouter from './routes/messageRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import userRouter from './routes/userRoutes.js';
import companyRouter from './routes/companyRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  console.log('Morgan Initialized');
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/message', messageRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/users', userRouter);
app.use('/api/company', companyRouter);
app.use('/api/ai-user', aiRouter);

export default app;
