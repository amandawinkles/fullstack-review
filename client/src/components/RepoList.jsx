import React from 'react';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    <h5>There are {props.repos.length} repos.</h5>
    <table>
      <thead>
        <tr>
          {repos[0] ?
            Object.keys(repos[0]).map((objKey, index) => {
              return (
                <th key={index}>{objKey}</th>
              )
            })
          : null}
        </tr>
      </thead>
      <tbody>
        {(repos.length > 0) ?
          repos.map((repo, index) => {
            return (
              <tr key={index}>
                <td>{repo.repoId}</td>
                <td>{repo.userLogin}</td>
                <td>{repo.repoName}</td>
                <td>{repo.forks}</td>
              </tr>
            )
          })
        : null}
      </tbody>
    </table>
  </div>
  );

export default RepoList;