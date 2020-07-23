const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const { getReposByUsername } = require('../helpers/github.js');
const db = require('../database'); //if going to index, can just refer to directory (will grab index file)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));

//2extended.
//take in post request from client, post username to db
//tied into search request in client
app.post('/repos', function (req, res) {
  //use your getReposByUsername function to fetch the specified user's GitHub repos, then use your save function to store the repo information in database
  console.log('🌀req.body.term: ', req.body.term);
  //func returns promise, so don't need to use Promise.resolve
  getReposByUsername(req.body.term)
    .then((data) => {
      console.log('calling db.save!');
      return db.save(data);
    })
    .then((data) => {
      res.status(200).send('posted username successfully', data);
    })
    .catch((error) => {
      res.status(500).send('error posting username', error);
      //console.log('error posting username', error);
    })
});

//1extended.
//this code is what runs when I startup app- from index.jsx, because this has enpoint repos and get request
//getting app running
app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  //filter
  db.Repo.find({ "forks": { $gt: 9} })
    .limit(25)
    .then(data => {
      res.send(data)
    })
    .catch(error => {
      console.log('error fetching data from db', error);
    })
});



let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


// app.post('/repos', function (req, res) {
//   //use your getReposByUsername function to fetch the specified user's GitHub repos, then use your save function to store the repo information in database
//   console.log('🌀req.body.term: ', req.body.term);
//   getUserRepos.getReposByUsername(req.body.term, (err, data) => {
//     if (err) {
//       console.log('error getting repos', err);
//     } else {
//       db.save(data);
//     }
//   });
//   res.status(200);
// });

