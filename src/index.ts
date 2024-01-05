import express from 'express';
import { json, urlencoded } from 'body-parser';
import { config } from './config';
import  helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { logger, morganOption } from './winston';
import  xmlparser from 'express-xml-bodyparser';
import  httpContext from 'express-http-context';

import { oauthVerification } from './middlewares/auth.middleware';
import {  UsersContoller } from './Controllers/userController';
import { TodoService } from './Services/todoService';
import { MongoClient } from 'mongodb';
import { TodoController } from './Controllers/todoController';
import { TodoCollection } from './Collections/todoCollection';
import { Database } from './Collections/config';
import { UserCollection } from './Collections/userCollection';
import { UserService } from './Services/userService';
import { Mongoose } from 'mongoose';


const Helmet = helmet as any;
const app = express();
const uri = "mongodb://"+config.get('db.host')+"/"+config.get('db.name')+"?retryWrites=true&w=majority";

app.use(Helmet());

// using bodyParser
app.use(urlencoded({ extended: true }));

// using bodyParser to parse JSON bodies into JS objects
app.use(json({ limit: '10mb' }));

// using XML body parser
app.use(xmlparser());

// enabling CORS for all requests
app.use(cors({ origin: true, credentials: true }));

// adding morgan to log HTTP requests
const format = ':remote-addr - ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"';
app.use(morgan(format, morganOption));

// Apply middlewares
app.use(httpContext.middleware);
app.use(oauthVerification); 

//dataaabases initialisation
const client = new MongoClient(uri)
const dataBase  = new Database()

//Todo resource initailisation
const todoCollection = new TodoCollection("todos")
const todoService = new TodoService(todoCollection);
const todoController = new TodoController(todoService);

//users Resource

const userCollection = new UserCollection("users")
const usersService = new UserService(userCollection);
const userController = new UsersContoller(usersService)




// Definition controllers
/* adressController.init(app);*/
userController.init(app); 
todoController.init(app);

// Start server



const main = express().use(config.get('basePath') || '', app);

main.listen(config.get('port'), async () => {
    logger.info(`server started. Listening on port ${config.get('port')} in "${config.get('env')}" mode`);
});
/* cronService.startCronTransfer(); */
export default app;


