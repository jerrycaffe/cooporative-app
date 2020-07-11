import express from 'express';
import morgan from 'morgan';

import dbConnection from './config/dbconnection';


// Initializing App
const app = express();

// Middlewares
// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Seeting Mogan
app.use(morgan('tiny'))

// Database connection
dbConnection();

// routes
app.get('/', (req, res)=>{
  res.send("Welcome to Honeyland Welfare Home")
})


// running server
const port = process.env.PORT || 9000;

app.listen(port, ()=>{
  console.log("Application started on port", port)
})