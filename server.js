const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'chanmyaeoo',
      password : 'deviscool',
      database : 'smart_brain'
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send(database.users);
});

app.post('/signin', (req, res)=>{ signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', (req, res)=>{ profile.handleProfileGet(req, res, db) });

app.put('/image', (req, res)=>{ image.handleImage(req, res, db) });
app.listen(3000, ()=>{
    console.log('app is running at port 3000');
});

/*
/ --> it is working
/signin --> POST -- Success/Fail
/register --> POST -- user
/profile:userId --> GET --user
/image --> PUT -- user
*/