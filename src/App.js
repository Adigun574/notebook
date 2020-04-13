import React from 'react';
import Login from './components/login';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Signup from './components/signup';
import Notes from './components/notes';
import { GlobalProvider } from './context/GlobalState';


import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    // <GlobalProvider>
      <Router>
          <Switch>
            <Route exact path="/">
              <GlobalProvider><Login /></GlobalProvider>
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
          </Switch>
      </Router>
    // </GlobalProvider>
    

  );
}

export default App;
