import React, { Component } from 'react';
import Home from './components/Home';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: '',
      active: 'dashboard',
    };
  }

  render() {
    return (
        <Home />
      )
  }
}

export default App;
