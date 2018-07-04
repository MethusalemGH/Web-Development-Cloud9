const parser = require(`body-parser`);
const express = require(`express`);
const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.set(`view engine`, `ejs`);

// INDEX index route GET
app.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`home`);
});

// ABOUT about route GET
app.get(`/about`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`about`);
});

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
