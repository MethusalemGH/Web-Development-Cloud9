const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

// "/"    => `Server is running ...`
app.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render('home');
});

app.get(`/message/:target`, (req, res) => {
  console.assert(req);
  const target = req.params.target;
  res.render('message', { targetVar: target });
});

app.get(`/posts`, (req, res) => {
  console.assert(req);
  const posts = [
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', author: 'John' },
    { title: 'Nulla vitae neque rutrum ex rutrum tincidunt.', author: 'Susie' },
    { title: 'Fusce et justo imperdiet lacus efficitur vestibulum.', author: 'Bob' },
    { title: 'Mauris vitae neque sed magna congue cursus non.', author: 'Jane' },
    { title: 'Nunc in dui quis leo facilisis interdum.', author: 'Anna' },
    { title: 'Morbi sit amet metus consectetur, pulvinar massa quis, efficitur lacus.', author: 'Mary' },
  ];
  res.render('posts', { posts: posts });
});


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
