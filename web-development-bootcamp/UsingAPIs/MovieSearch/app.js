const express = require(`express`);
const parser = require(`body-parser`);
const request = require(`request`);
const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.set(`view engine`, `ejs`);


// "/"    => Render search page
app.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`search`);
});

// "/results"    => Show results for the movie search
app.get(`/results`, (req, res) => {
  const searchMovie = req.query.searchMovie;
  const requestURL = `http://www.omdbapi.com/?apikey=thewdb&s=${searchMovie}`;

  request(requestURL, (error, response, body) => {
    if (error === null && response.statusCode === 200) {
      const movieData = JSON.parse(body);
      if (movieData.Response === 'True') {
        res.render(`results`, { movieData: movieData });
      }
    }
  });
});


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
