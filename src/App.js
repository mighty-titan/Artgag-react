import React, { Component } from 'react';
import Nav from './components/Nav';
import './App.css';
import './adds/foundation-icons.css';
import { Redirect } from 'react-router-dom';
import API from './adds/API-calls';

class App extends Component {
constructor(props){
    super(props);

    this.state = {
        posts: [false],
        comments: [],
        userId: localStorage.getItem('userId'), 
        login: localStorage.getItem('login'),
        password: '',
        token: localStorage.getItem('token'),
        message: null,
      };
}
componentDidMount(){
 API.getPosts().then((results) => { this.setState({ posts: results }) });
}
messageHandler = (message) => {
  this.setState({ message });
}

userLogout = () => { 
  this.setState({
      userId: null, 
      login: null,
      password: null,
      token: null,
  });
 localStorage.removeItem('userId');
 localStorage.removeItem('login');
 localStorage.removeItem('isLogged');
 localStorage.removeItem('token');
}
handleLoginChange = (login) => { this.setState({ login }) }
handlePasswordChange = (password) => { this.setState({ password }) }
onLogin = (e) => {
  e.preventDefault();
  API.loginUser(this.state.login, this.state.password)
      .then((response) => {
        if(response.data.status){
          this.setState({ 
            userId: response.data.userId,
            token: response.data.token,
          });
          localStorage.setItem("login", this.state.login);
          localStorage.setItem("userId", this.state.userId);
          localStorage.setItem("token", this.state.token);
          <Redirect to="/"/>
        }
         this.setState({ message: response.data.message });
      })
}
  render() {
    return (
      <div className="">
          <Nav
            data={this.state}
            fetchPosts={this.getPosts}
            loginHandle={this.onLogin}
            loginChange={this.handleLoginChange}
            passwordChange={this.handlePasswordChange}
            logoutHandle={this.userLogout}
            messageHandler={this.messageHandler}
          />
      </div>
    );
  }
}

export default App;
