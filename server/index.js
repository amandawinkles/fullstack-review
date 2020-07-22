const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const getUser = require('./../helpers/github.js');
const db = require('./../database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  //use your getReposByUsername function to fetch the specified user's GitHub repos, then use your save function to store the repo information in database
  console.log('🌀req.body.term: ', req.body.term);
  getUser.getReposByUsername(req.body.term, (err, data) => {
    if (err) {
      console.log('error getting repos', err);
    } else {
      db.save(data);
    }
  });
  res.status(200);
});

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

