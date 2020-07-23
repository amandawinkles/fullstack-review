const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db!');
});

let repoSchema = mongoose.Schema({
  repoId: {type: Number, default: 0},
  userLogin: {type: String, trim: true, default: ''},
  repoName: {type: String, trim: true, default: ''},
  forks: {type: Number, default: 0}
});

let Repo = mongoose.model('Repo', repoSchema);

//2d.
let save = (githubRepos) => {
  console.log('inside save function for db!:', githubRepos);
  //returns one promise for all repos
  //promise.all will resolve an array of promises, each promise will save to db
  //return promise.all()
  //build small promise chain, handle success & error
  let repo = new Repo({
    repoId: githubRepos.repoId,
    userLogin: githubRepos.userLogin,
    repoName: githubRepos.repoName,
    forks: githubRepos.forks
  });
  return repo.save();
}

module.exports = { save, Repo };

  //no callbacks- just promises- don't forget to return the promise, so promise chain will keep running

  //Repo.insertMany()
   //or bulkInsert mongo functionality, also a promise, so return it

  // return Promise.all(githubRepos)
  //   .then((repos) => {
  //     return repos.map(repo => {
  //       repo = new Repo({
  //         repoId: githubRepos.repoId,
  //         userLogin: githubRepos.userLogin,
  //         repoName: githubRepos.repoName,
  //         forks: githubRepos.forks
  //       })
  //     })
  //   })
  //   .then((repoCollection) => {
  //     return repoCollection.save();
  //   })
  //   .catch((error) => {
  //     console.log('error processing repos in save()', error);
  //   })