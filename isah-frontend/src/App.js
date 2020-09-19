import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import Home from "./components/Home"
import Challenge from './components/Challenge';
import Profile from './components/Profile';


function App() {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/challenge/:id' exact component={Challenge} />
          <Route path='/profile' exact component={Profile} />
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
