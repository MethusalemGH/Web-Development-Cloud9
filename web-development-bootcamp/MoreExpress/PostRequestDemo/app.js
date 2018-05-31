const express = require(`express`);
const parser = require(`body-parser`);
const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.set(`view engine`, `ejs`);

const friends = [`Cherish`, `Milissa`, `Nova`, `Shelton`, `Lashon`];

// "/"    => `Server is running ...`
app.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`home`);
});

// "/friends"    => Show page with friend list
app.get(`/friends`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`friends`, { friends: friends });
});

// "/addFriend"    => Add new friend to the list
app.post(`/addFriend`, (req, res) => {
  friends.push(req.body.friend);
  res.redirect(`/friends`);
});

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
