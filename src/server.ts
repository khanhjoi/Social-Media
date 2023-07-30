import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import routes from './routes/index';
import cors from 'cors';

const app: Express = express();

// Connect to Mongo
mongoose
  .connect(config.mongo.url, { retryWrites: true,  w: 'majority'})
  .then(() => {
    console.log("Connected to Database");
    StartServer();
  })
  .catch((error) => {
    console.log(error);
  })

// start only connect to mongodb
const StartServer = () => {
  
  //express understand -> body request 
  app.use(express.json());
  app.use(cors({
    origin: ['http://localhost:3000'],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  }));
  
  
  // routes
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

  app.use('/api', routes());
  
  //start server
  app.listen(config.server.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${config.server.port}`);
  });
}