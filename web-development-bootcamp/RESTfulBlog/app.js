const expressSanitizer = require(`express-sanitizer`);
const methodOverride = require(`method-override`);
const parser = require(`body-parser`);
const mongoose = require(`mongoose`);
const express = require(`express`);
const app = express();

mongoose.connect(`mongodb://localhost/RESTfulBlog`);

app.use(parser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride(`_method`));
app.use(express.static(`public`));
app.set(`view engine`, `ejs`);

// Mongo definitions for Blog entry
const blogSchema = new mongoose.Schema({
  title: String,
  imageURL: String,
  body: String,
  created: { type: Date, default: Date.now }
});
const Blog = mongoose.model(`Blog`, blogSchema);

// "/routes" => table with RESTful routes
app.get(`/routes`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`routes`);
});

// Index	/blogs	GET	List all Blog posts
app.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.redirect(`/blogs`);
});

app.get(`/blogs`, (req, res) => {
  console.assert(req); // unreferenced parameter
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(`Can't find any Blogs!`);
    }
    else {
      res.render(`index`, { blogs: blogs });
    }
  });
});

// New	/blogs/new	GET	Show new blog entry form
app.get(`/blogs/new`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`new`);
});

// Create	/blogs	POST	Create a new Blog entry, then redirect somewhere
app.post(`/blogs`, (req, res) => {
  console.assert(req); // unreferenced parameter
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, (err) => {
    if (err) {
      res.redirect(`/blogs/new`);
    }
    else {
      res.redirect(`/blogs`);
    }
  });
});

// Show	/blogs/:id	GET	Show info about one specific Blog
app.get(`/blogs/:id`, (req, res) => {
  console.assert(req); // unreferenced parameter
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      res.redirect('/blogs');
    }
    else {
      res.render(`show`, { blog: blog });
    }
  });
});

// Edit	/blogs/:id/edit	GET	Show Edit form for one Blog entry
app.get(`/blogs/:id/edit`, (req, res) => {
  console.assert(req); // unreferenced parameter
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      res.redirect('/blogs');
    }
    else {
      res.render(`edit`, { blog: blog });
    }
  });
});

// Update	/blogs/:id	PUT	Update one particular Blog entry, then redirect somewhere
app.put(`/blogs/:id`, (req, res) => {
  console.assert(req); // unreferenced parameter
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
    if (err) {
      res.redirect('/blogs');
    }
    else {
      res.redirect(`/blogs/${blog._id}`);
    }
  });
});

// Destroy	/blogs/:id	DELETE	Delete one particular Blog entry, then redirect somewhere
app.delete('/blogs/:id', (req, res) => {
  console.assert(req); // unreferenced parameter
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/blogs');
    }
    else {
      res.redirect(`/blogs`);
    }
  });
});

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
