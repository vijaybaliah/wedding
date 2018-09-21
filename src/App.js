import React, { Component } from 'react';
import MainAppContainer from './Containers/MainContainer/MainAppContainer';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    
    return (
      <main>
        <Route path={'/wedding/'} exact component={MainAppContainer} />
      </main>
    );
  }
}

export default App;
