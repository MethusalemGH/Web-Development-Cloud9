const express = require(`express`);
const parser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require(`cors`);

const knex = require(`knex`)({
  client: 'pg',
  connection: {
    host: process.env.IP,
    user: 'ubuntu',
    password: 'postgres',
    database: 'smart-brain'
  }
});
knex.select(`*`).from(`users`).then(data => {
  console.log(data);
});

console.assert(bcrypt);

const app = express();
app.use(parser.json());
app.use(cors());

const database = {
  users: [
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: 2,
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
};

// "/"    => "Hi there!"
app.get(`/`, (req, res) => {
  console.assert(req);
  res.json(database.users);
});

// "/signin" --> POST = success/fail
app.post(`/signin`, (req, res) => {
  let response = {
    status: 400,
    message: 'Error signing in ...'
  };
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    response = { status: 200, message: database.users[0] };
  }
  res.status(response.status).json(response.message);
});

// "/register" --> POST = user
app.post(`/register`, (req, res) => {
  let response = {
    status: 400,
    message: 'Error registering ...'
  };
  const newId = database.users[database.users.length - 1].id + 1;
  database.users.push({
    id: newId,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    entries: 0,
    joined: new Date()
  });
  response = { status: 200, message: database.users[database.users.length - 1] };
  res.status(response.status).json(response.message);
});

// "/profile/:Id" --> GET = user
app.get('/profile/:id', (req, res) => {
  let response = {
    status: 400,
    message: `Error finding user ...`
  };
  const id = Number(req.params.id);
  for (let index = 0; index < database.users.length; index++) {
    const user = database.users[index];
    if (user.id === id) {
      response = { status: 200, message: user };
      break;
    }
  }
  res.status(response.status).json(response.message);
});

// "/image" --> PUT = rank
app.put('/image', (req, res) => {
  let response = {
    status: 400,
    message: 'Error finding user ...'
  };
  const id = Number(req.body.id);
  for (let index = 0; index < database.users.length; index++) {
    const user = database.users[index];
    if (user.id === id) {
      user.entries++;
      response = { status: 200, message: user.entries };
      break;
    }
  }
  res.status(response.status).json(response.message);
});


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
