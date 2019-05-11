const express = require('express');
let app = express();
const bodyParser = require ('body-parser');
const getReposByUsername = require ('../helpers/github.js')
const database = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.post('/repos', function (req, res) {
var username = req.body
getReposByUsername.getReposByUsername(username, (result)=>{
    var parsed = JSON.parse(result)
    parsed.forEach(function(obj) {
      database.save(obj)
    })

  //  for (var {name, id, owner:{login}, stargazers_count, watchers, forks, html_url, description } of parsed) {
  //    console.log(name, id, login, stargazers_count, watchers, forks, html_url, description)
  })
  res.status(200).send('database saving successful')
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // read from db
  database.find25()
    .then(repos => {
      // console.log('top 25 docs in db:', docs);
      // respond with db results
      res.json({'repos': repos});
    })
    .catch(err => {
      console.error('Error on db find:', err);
      res.status(404).json({ error: err });
    });

});

// app.get('/repos', function (req, res) {
//   // var query = database.repos.find({ qty: { $lt: 25 } }).sort({stars:1});
//   res.send(database.find25())
//   .then(() => {
//     // upon successful updates from DB, send post response 201
//     res.json();
//   })
//   .catch(err => {
//     // upon error, send post response 500
//     console.error('Error on Post:', err);
//     res.status(500).json({ error: err });
//   })
// // TODO - your code here!
//   // This route should send back the top 25 repos
// });

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

