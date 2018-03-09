const express = require("express");
const app = express();

// =====================================================================
// "/"    => `Welcome to this exercise!``
app.get(`/`, (req, res) => {
  req; // unreferenced parameter
  res.send(`Welcome to this exercise!`);
});

// =====================================================================
// "/speak/pig"    => `Oink!`
// "/speak/cow"    => `Mooo!`
// "/speak/dog"    => `Woof Woof!``
app.get(`/speak/:animal`, (req, res) => {
  const animal = req.params.animal.toLowerCase();
  const sounds = {
    pig: `Oink!`,
    cow: `Mooo!`,
    dog: `Woof Woof!`
  };
  let sound = sounds[animal];
  if (typeof sound !== "string") sound = `...`;

  res.send(`The ${animal} says "${sound}".`);
});

// =====================================================================
// Repeat 'text' and print it 'num' times
app.get(`/repeat/:text/:num`, (req, res) => {
  const num = parseInt(req.params.num, 10);
  let text = req.params.text;

  res.send(`${text} `.repeat(num));
});


// =====================================================================
// Catch-all handler, NEEDS TO BE LAST
app.get(`*`, (req, res) => {
  req; // unreferenced parameter
  res.send(`Sorry, page not found. ... What are you doing today?`);
});

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
