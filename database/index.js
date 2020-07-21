const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db!');
});

let repoSchema = mongoose.Schema({
  userLogin: String,
  repoName: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (githubRepo) => {
  let repo = new Repo();
  repo.userLogin = 'username';
  repo.repoName = 'repoName';
  repo.forks = 1;

  repo.save();
}

module.exports.save = save;