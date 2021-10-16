import React, {
  useState
} from 'react';

const GithubSearch = () => {
  const [username, setUsername] = useState(null)
  const getUser = (e) => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
  }
  const getRepos = (e) => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
  }
  return ( 
    <div>
      <h3> GithubSearch </h3> 
      <div>
        <input type = "text" onInput = {(e) => setUsername(e.target.value)} /> 
      </div> 
      <div >
        <button onClick = {getUser} > Get user Info </button>
      </div>
      <div>
        <button onClick = {getRepos} > Get user Info </button>
      </div>
    </div>
  )
}

export default GithubSearch;