import React, { Component } from 'react';
import './assets/css/App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodosList from './TodosList';
import TodoEdit from './TodoEdit';

class App extends Component {
  render() {
    return (
      <div className="root">
        <div className="wrapper">
          <div className="main-panel">
            <Router>
              <Switch>
                <Route path="/" exact={true} component={Home}></Route>
                <Route path="/todos" exact={true} component={TodosList}></Route>
                <Route path="/todos/:id" component={TodoEdit}></Route>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App; 
