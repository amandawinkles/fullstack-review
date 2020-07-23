import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.getUserRepos = this.getUserRepos.bind(this);
  }

  //1.
  //gets initial batch of data from db
  //invoked when react is up & running, this fetches data for app
  componentDidMount() {
    this.getUserRepos();
  }

  //1a.
  //runs when app is initialized
  //use getUserRepos more than once
  //sending request to server so server can query db for top 25
  //finds out what's in db right now for top 25 repos & render it
  //nothing in db first time
  getUserRepos() {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: (response) => {
        //console.log('response from github: ', response);
        this.setState({
          repos: response
        });
        //setState is async, so this console.log won't be immediate
        //console.log('GET request successful: ', this.state.repos);
      },
      error: (error) => {
        console.log('error getting data: ', error);
      }
    });
  }

  //2.
  //user input-> post request to server w/username
  //when server code written async, take set timeout out of success block & only have get user repos code here
  //encoding type may need to be added to tell server I want json,
  //because consistency is needed between types sent back & forth between computers
  search (term) {
    console.log(`${term} was searched`);
    term = JSON.stringify({term: term});
    $.ajax({
      url: '/repos',
      method: 'POST',
      //term is what will be sent in request body
      data: term,
      //whatever comes back from server for this request will be json
      contentType: 'application/json'
    })
    //then bring back the data
    .then(() => {
      this.getUserRepos();
    })
    .catch((error) => {
      console.log('error posting data', error);
    })
  }

  render () {
    return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// search (term) {
//   console.log(`${term} was searched`);
//   term = JSON.stringify({term: term});
//   $.ajax({
//     url: 'http://localhost:1128/repos',
//     method: 'POST',
//     //term is what will be sent in request body
//     data: term,
//     //whatever comes back from server for this request will be json
//     contentType: 'application/json',
//     success: (response) => {
//       console.log('successfully posted data', response);
//       setTimeout(() => {
//         this.getUserRepos();
//       }, 1000)
//     },
//     error: (error) => {
//       console.log('error posting data', error);
//     }
//   });
// }

// $.ajax({
//   url: '/repos',
//   method: 'GET',
//   success: (data) => {
//     console.log('successfully posted data')
//   }
// })

// success: (response) => {
      //   console.log('successfully posted data');
      //   this.getUserRepos();
      //   // setTimeout(() => {
      //   //   this.getUserRepos();
      //   // }, 1000)
      // },
      // error: (error) => {
      //   console.log('error posting data', error);
      // }