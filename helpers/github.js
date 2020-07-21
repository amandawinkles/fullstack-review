const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  axios.get('/user', {
    let options = {
      url: 'https://api.github.com/users/username/repos',
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${config.TOKEN}`
      }
    };
  })
  .then(response => console.log(response))
  .catch(error => console.log(error))
}

module.exports.getReposByUsername = getReposByUsername;

//https://api.github.com/users/username/repos



/*
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
*/