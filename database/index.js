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

//2extended.
let save = (githubRepos) => {
  console.log('inside save function for db!:', githubRepos);
  //Repo.insertMany()
  //returns one promise for all repos
  //no callbacks- just promises- don't forget to return the promise, so promise chain will keep running
  //promise.all will resolve an array of promises, each promise will save to db
  //return promise.all()
  //or bulkInsert mongo functionality, also a promise, so return it
  //build small promise chain, handle success & error
  //need to fs.readFile for each one? forEach
  return Promise.all(githubRepos)
    .then((repos) => {
      repos.map(repo => {
        if (repo) {
          repo.save() //figure out what to put in the save method
        } else {
          Repo.create({
            repoId: repo.repoId,
            userLogin: repo.userLogin.login,
            repoName: repo.repoName,
            forks: repo.forks
          })
        }
      })
    })
    .catch((error) => {
      console.log('error processing repos in save()', error);
    })
}

module.exports = { save, Repo };





// githubRepo.forEach(repo => {
//   Repo.findOne({repoId: repo.repoId}, (err, res) => {
//     if (err) {
//       console.log('error finding repoId: ', err);
//     } else {
//       if (res) {
//         console.log('id taken');
//       } else {
//         Repo.create({
//           repoId: repo.repoId,
//           userLogin: repo.userLogin.login,
//           repoName: repo.repoName,
//           forks: repo.forks
//         });
//       }
//     }
//   })
// })