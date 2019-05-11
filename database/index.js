const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function() {
//     console.log("Connection Successful!");


let repoSchema = mongoose.Schema({
  description: String,
  stars: Number,
  forks: Number,
  watchers: Number,
  url: String,
  id: Number,
  username: String

});



let Repo = mongoose.model('Repo', repoSchema);




let save = (repo) => {

  var repo = new Repo({
    description: repo.description,
    stars: repo.stars,
    forks: repo.forks,
    watchers: repo.stargazers_count,
    url: repo.html_url,
    id: repo.id,
    username: repo.owner.login
  });
  repo.save((err, data) => {
  	if (err) {
  		console.log('Error', err);
  	} else {
  		console.log('Success');
  	}
  });
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}


let find25 = () => {
  return Repo.find()
    .limit(25)
    .sort('-stargazers_count')
    .exec();
}
// let fetch = callback => {
//   let cb = (err, repos) => { callback(repos) };
//   Repo.find(cb).sort('-stargazers_count').limit(25);
// }

module.exports.save = save;
module.exports.find25 = find25;