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

  componentDidMount() {
    this.getUserRepos();
  }

  getUserRepos() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      success: (data) => {
        this.setState({
          repos: data
        });
        console.log('GET request successful: ', this.state.repos);
      },
      error: (error) => {
        console.log('error getting data: ', error);
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: {
        term: term
        //term is what will be sent in request body
      },
      success: (data) => {
        console.log('successfully posted data', data);
        setTimeout(() => {
          this.getUserRepos();
        }, 1000)
      },
      error: (error) => {
        console.log('error posting data', error);
      }
    });
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