const mongoose = require(`mongoose`);
console.assert(mongoose);

const Campground = require(`./models/campground`);
const Comment = require(`./models/comment`);

const campgroundData = [
  {
    name: `Alafia River State Park`,
    imageURL: `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Alligator_-_Alafia_Springs_State_Park.jpg/1920px-Alligator_-_Alafia_Springs_State_Park.jpg`,
    description: `<p>So this is the tale of our castaways they're here for a long long time. They'll have to make the best of things its an uphill climb. And we know Flipper lives in a world full of wonder flying there-under under the sea.</p><p>Love exciting and new. Come aboard were expecting you. Love life's sweetest reward Let it flow it floats back to you. So lets make the most of this beautiful day. Since we're together. Just two good ol' boys Wouldn't change if they could. Fightin' the system like a true modern day Robin Hood.</p>`
  },
  {
    name: `Amelia Island State Park`,
    imageURL: `https://upload.wikimedia.org/wikipedia/commons/d/da/AmeliaIslandAerial.jpg`,
    description: `<p>And we'll do it our way yes our way. Make all our dreams come true for me and you. Got kind of tired packin' and unpackin' - town to town and up and down the dial. Here's the story of a lovely lady who was bringing up three very lovely girls. So this is the tale of our castaways they're here for a long long time.</p><p>They'll have to make the best of things its an uphill climb. All of them had hair of gold like their mother the youngest one in curls.And we'll do it our way yes our way. Make all our dreams come true for me and you.</p>`
  },
  {
    name: `Bald Point State Park`,
    imageURL: `https://upload.wikimedia.org/wikipedia/commons/3/34/BaldPointStateParkDock.jpg`,
    description: `<p>All of them had hair of gold like their mother the youngest one in curls. He's gainin' on you so you better look alive. He busy revin' up his Powerful Mach 5. Today still wanted by the government they survive as soldiers of fortune.</p><p>Well we're movin' on up to the east side. To a deluxe apartment in the sky. Movin' on up to the east side. We finally got a piece of the pie. Got kind of tired packin' and unpackin' - town to town and up and down the dial.</p><p>In 1972 a crack commando unit was sent to prison by a military court for a crime they didn't commit. These men promptly escaped from a maximum security stockade to the Los Angeles underground.</p>`
  },
  {
    name: `The Barnacle Historic State Park`,
    imageURL: `https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Miami_229.jpg/1280px-Miami_229.jpg`,
    description: `<p>Love exciting and new. Come aboard were expecting you. Love life's sweetest reward Let it flow it floats back to you. Just two good ol' boys Never meanin' no harm. Beats all you've ever saw been in trouble with the law since the day they was born. Why do we always come here? I guess well never know. Its like a kind of torture to have to watch the show.</p><p>Why do we always come here? I guess well never know. Its like a kind of torture to have to watch the show. Goodbye gray sky hello blue. There's nothing can hold me when I hold you. Feels so right it cant be wrong. Rockin' and rollin' all week long.</p>`
  },
  {
    name: `Camp Helen State Park`,
    imageURL: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/PC_Beach_Camp_Helen_SP04.jpg/1280px-PC_Beach_Camp_Helen_SP04.jpg`,
    description: `<p>Sunny Days sweepin' the clouds away. On my way to where the air is sweet. Can you tell me how to get how to get to Sesame Street.</p><p>Well the first thing you know ol' Jeds a millionaire. Kinfolk said Jed move away from there. That this group would somehow form a family that's the way we all became the Brady Bunch. As long as we live its you and me baby. There ain't nothin' wrong with that! Sunday Monday Happy Days. Tuesday Wednesday Happy Days. Thursday Friday Happy Days.Saturday what a day. Groovin' all week with you.</p><p>These days are all Happy and Free. These days are all share them with me oh baby. The movie star the professor and Mary Ann here on Gilligans Isle.; Movin' on up to the east side. We finally got a piece of the pie.</p>`
  },
  {
    name: `Cedar Key Museum State Park`,
    imageURL: `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Cedar_Key_State_Museum_Whitman04.JPG/1280px-Cedar_Key_State_Museum_Whitman04.JPG`,
    description: `<p>Movin' on up to the east side. We finally got a piece of the pie. Doin' it our way. There's nothing we wont try. Never heard the word impossible. This time there's no stopping us. Today still wanted by the government they survive as soldiers of fortune., "And we'll do it our way yes our way. Make all our dreams come true for me and you?" Movin' on up to the east side.</p><p>We finally got a piece of the pie. Baby if you've ever wondered - wondered whatever became of me. I'm living on the air in Cincinnati. Cincinnati WKRP. They were four men living all together yet they were all alone.</p>`
  }
];

// Random comments:
// =========================================
// I don't have an attitude problem. You have a perception problem.
// Who says nothing is impossible? I've been doing nothing for years.
// All men make mistakes, but married men find out about them sooner.
// Education is going to college to learn to express your ignorance in scientific terms.
// Some people can tell what time it is by looking at the sun. But I have never been able to make out the numbers.
// Light travels faster than sound. This is why some people appear bright until you hear them speak.
// The world is filled with willing people; some willing to work, the rest willing to let them.
// I've learned that we are responsible for what we do, unless we are celebrities or politicians.
// Optimists say the glass is half-full, Pessimists say the glass is half empty, I says it's time for a beer run.
// A good scapegoat is nearly as welcome as a solution to the problem.


// The following two lines will initialize the DB records when added to app.js
// const seedDB = require(`./seeds`);
// seedDB();

function seedDB() {
  // Remove all existing campgrounds from DB
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`Removed all existing campgrounds ...`);

      // Add new seed campgrounds back into DB
      campgroundData.forEach((data) => {
        Campground.create(data, (err, campground) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log(`Added new campground. Id = ${campground._id}`);
          }
        });
      });
    }
  });
}
module.exports = seedDB;
