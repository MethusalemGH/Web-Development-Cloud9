let express = require(`express`);
let app = express();

// "/"    => "Hi there!"
app.get(`/`, (req, res) => {
  console.assert(req);
  res.send(`Hi There!!`);
});

// "/bye" => "Goodbye!"
app.get(`/bye`, (req, res) => {
  console.assert(req);
  res.send(`Goodbye!!`);
});

// "/dog" => "MEOW"
app.get(`/dog`, (req, res) => {
  console.assert(req);
  res.send(`MEOW!!`);
});

// Using a ROUTE PARAMETER
app.get(`/food/:foodName`, (req, res) => {
  console.assert(req);
  res.send(`Hmmmm, yummy. I love ${req.params.foodName}!`);
});

// Catch-all handler, NEEDS TO BE LAST
app.get(`*`, (req, res) => {
  console.assert(req);
  res.send(`You are a star ...`);
});


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
