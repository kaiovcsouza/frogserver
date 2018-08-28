const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
require('dotenv').config();

const signin = require('./controllers/signin');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

//Configuração Database
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

app.get('/', function (req, res) { res.send('SERVIDOR ON') });

app.post('/signin', signin.signinAuthentication(db, bcrypt))
//Porta no qual servidor será hospedado
app.listen(3001, () => { console.log('Server ON port 3001'); })