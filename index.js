const path = require('path');
const express = require('express');
const { engine } = require('express-edge');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');



const app = new express();


const homeController = require('./controllers/home');
const adminController = require('./controllers/admin');
const loginController = require('./controllers/login');
const loginStaffController = require('./controllers/loginStaff');
const aboutController = require('./controllers/about');
const addStaffController = require('./controllers/addStaff');
const storeStaffController = require('./controllers/storeStaff');

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/honeylandWelfare', { useNewUrlParser: true, useUnifiedTopology: true})
const addStaffAuth = require('./middleware/addStaffAuth');

//app.get('/', (req, res)=>{
//res.sendFile(path.resolve(__dirname, 'pages/index.html'))
//})

app.use(engine);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//app.use('/addStaff', addStaffAuth);

//app.set('views', '${__dirname}/views');

app.get('/', homeController);
app.get('/admin', adminController);
app.get('/auth/login', loginController);
app.get('/about', aboutController);
app.get('/auth/addStaff', addStaffController);
app.post('/addStaff', storeStaffController);
app.post('/staff/login', loginStaffController);
app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

