import express from 'express';
import morgan from 'morgan';

import staff from './routes/api/authStaff';
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
app.use('/auth/staff', staff);

app.get('/', (req, res)=>{
  res.send("Welcome to Honeyland Welfare Home")
})

app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

// running server
const port = process.env.PORT || 9000;

app.listen(port, ()=>{
  console.log("Application started on port", port)
})