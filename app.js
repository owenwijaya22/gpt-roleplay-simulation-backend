import express from 'express';
import morgan from 'morgan';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import helmet from 'helmet';

import messageRouter from './routes/messageRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import userRouter from './routes/userRoutes.js';
import companyRouter from './routes/companyRoutes.js';
import aiRouter from './routes/aiRoutes.js';
import questionRouter from './routes/questionRoutes.js';
import taskRouter from './routes/taskRoutes.js';
import attemptRouter from './routes/attemptRoutes.js';
import eventRouter from './routes/eventRoutes.js';
import clueRouter from './routes/clueRoutes.js';
import proposalRouter from './routes/proposalRoute.js';
// import hpp from 'hpp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const options = {
  info: {
    version: '1.0.0',
    title: 'Your App Name',
    description: 'Your App Description',
    license: {
      name: 'MIT',
    },
  },
  filesPattern: './**/*.js',
  baseDir: __dirname,
};
expressJSDocSwagger(app)(options);

if (process.env.NODE_ENV === 'development') {
  console.log('Morgan Initialized');
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// app.use(hpp());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/messages', messageRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/users', userRouter);
app.use('/api/companies', companyRouter);
app.use('/api/ai-user', aiRouter);
app.use('/api/questions', questionRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/attempts', attemptRouter);
app.use('/api/events', eventRouter);
app.use('/api/clue', clueRouter);
app.use('/api/proposal', proposalRouter);

export default app;
