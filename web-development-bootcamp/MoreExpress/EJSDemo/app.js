const express = require('express');
const app = express();

// "/"    => `Server is running ...`
app.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render('home.ejs');
});

app.get(`/message/:target`, (req, res) => {
  console.assert(req);
  let target = req.params.target;
  res.render('message.ejs', { targetVar: target });
});


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
