import React from 'react';

import './App.css';
import axios from "axios";
import UserCard from './Components/UserCard';
import FollowerCard from './Components/FollowerCard';

class App extends React.Component {
  state = {
    user: [],
    followers:[],
  };

 

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/ianpaulfo`)
      .then(res => {
        this.setState({
          user: [res.data]
        });
        console.log("Axios Call User Data:", res.data);
      })
        .catch(err => console.log(err));

    axios
     .get(`https://api.github.com/users/ianpaulfo/followers`)

      .then(res => {
        this.setState({ followers: res.data });
        console.log("Axios Call followers Data:", res.data);
      })
      .catch(err => console.log(err));
    }

  render() {
    return (
      <div className="App">
        <h1>GitHub User</h1>
        {this.state.user.map(item => (
          <UserCard
          key={item.id}
          name={item.name}
          login={item.login}
          bio={item.bio}
          img={item.avatar_url}
          url={item.html_url}
          location={item.location}
       />
       ))}
        <h2>Followers:</h2>
        <div className="followers">
        {this.state.followers.map(item => (
            <FollowerCard
            key={item.id}
            login={item.login}
            img={item.avatar_url}
            url={item.html_url}
            />
          ))}
        </div>      
      </div>
    );
  }
}

export default App;