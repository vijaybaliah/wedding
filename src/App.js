import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ReactGA from 'react-ga';
import Profile from './Containers/profile';
import Wedding from './Containers/wedding';
import StroopTest from './Containers/stroopAnalysis/StroopTest';
import StroopDescription from './Containers/stroopAnalysis/StroopDescription';

ReactGA.initialize('UA-72154701-5');

class App extends Component {
  render() {
    
    return (
      <main>
        <Route path={'/'} exact component={Profile} />
        <Route path={'/wedding'} exact component={Wedding} />
        <Route path={'/stroop-analysis/test'} exact component={StroopTest} />
        <Route path={'/stroop-analysis'} exact component={StroopDescription} />
      </main>
    );
  }
}

export default App;
