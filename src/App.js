import './App.css';

import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useContext, useState } from 'react';

import Add from './components/Add';
import Generate from './components/Generate';
import Home from './components/Home';
import Invoice from './components/Invoice';
import Login from './components/Login';
import { UserContext } from './context/usercontext';

function App() {
  const [user,setUser]=useState(false);

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={{user,setUser}}>
          {!user?
          <Switch>
          <Route path='/' exact component={Login}/>
          </Switch>:
          <Switch>
            <Route path='/' exact component={Login}/>
        <Route path='/home' exact component={Home}/>
        <Route path='/invoice' exact component={Invoice}/>
        <Route path='/add' exact component={Add}/>
        <Route path='/generate' exact component={Generate}/>
          </Switch>
          }
          {!user?
          <Redirect to='/'/>:
          <Redirect to='/home'/>
          }
        
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
