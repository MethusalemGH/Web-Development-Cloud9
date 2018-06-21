const express = require(`express`);
const parser = require(`body-parser`);
//const request = require(`request`);
const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.set(`view engine`, `ejs`);

// the campgrounds will be moved into a database
const campgrounds = [
  { name: `Biscayne National Park`, image: `https://farm5.staticflickr.com/4070/4712488841_461e461219.jpg` },
  { name: `Everglades National Park`, image: `https://farm4.staticflickr.com/3587/3633332082_f7e4c8d593.jpg` },
  { name: `Big Cypress National Preserve`, image: `https://farm4.staticflickr.com/3550/5713544492_cf5589d867.jpg` },
  { name: `Dry Tortugas National Park`, image: `https://farm6.staticflickr.com/5046/5330257235_072c983c0d.jpg` },
  { name: `Canaveral National Seashore`, image: `https://koa.com/content/campgrounds/kissimmee/photos/09329photoe17ab159-54ed-40ac-848c-9ff35fc103f2.jpg` },
  { name: `Gulf Islands National Seashore`, image: `https://farm2.staticflickr.com/1406/1031064431_8a1de396c6.jpg` },
  { name: `Big Thicket National Preserve`, image: `https://farm8.staticflickr.com/7357/10006742325_6d27ce0855.jpg` },
  { name: `Padre Island National Seashore`, image: `https://lhee981moy-flywheel.netdna-ssl.com/wp-content/uploads/2018/03/Padre-Island-National-Seashore.jpg` },
];

// "/"    => Render home page
app.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`home`);
});

// "/"    => Show the different campgrounds
app.get(`/campgrounds`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`campgrounds`, { campgrounds: campgrounds });
});

// "/"    => Add new campground site
app.post(`/campgrounds`, (req, res) => {
  const name = req.body.name;
  const image = req.body.image;

  campgrounds.push({ name: name, image: image });
  res.redirect('/campgrounds');
});

// "/"    => Add new campground site input
app.get(`/campgrounds/new`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`new`, { campgrounds: campgrounds });
});


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
