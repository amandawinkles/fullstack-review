const axios = require('axios');
const config = require('../config.js');

//2extended. helper func for getting user repos by username
let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  let options = {
    method: 'GET',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return axios(options)
  .then((response) => {
    return response.data;
    //console.log('GET user access successful!: ', response.data);
  })
  .catch((error) => {
    console.log('Error getting user access: ', error);
  });
}


module.exports.getReposByUsername = getReposByUsername;



// return axios({
//   method: 'GET',
//   url: `https://api.github.com/users/${username}/repos`,
//   headers: {
//     'User-Agent': 'request',
//     'Authorization': `token ${config.TOKEN}`
//   }
// })
// .then((response) => {
//   console.log('GET user access successful!: ', response.data);
//   //return response.data;
// })
// .catch((error) => {
//   console.log('Error getting user access: ', error);
// });

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