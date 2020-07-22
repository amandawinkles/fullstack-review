const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db!');
});

let repoSchema = mongoose.Schema({
  repoId: Number,
  userLogin: String,
  repoName: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (githubRepo) => {
  githubRepo.forEach(repo => {
    Repo.findOne({repoId: repo.repoId}, (err, res) => {
      if (err) {
        console.log('error finding repoId: ', err);
      } else {
        if (res) {
          console.log('id taken');
        } else {
          Repo.create({
            repoId: repo.repoId,
            userLogin: repo.userLogin,
            repoName: repo.repoName,
            forks: repo.forks
          });
        }
      }
    })
  })
}

module.exports.save = save;