import React, {useState} from 'react';
//import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import AddCode from "./pages/addCode";
import RegistryTab from "./components/registryTab";
import ShowSnippet from "./pages/showSnippet";
import Logout from "./pages/logout";

import NavBar from "./components/navBar/navBar";
import UserContext from "./context/userContext";

const axios = require("axios");


function App() {
  const [user, setUser] = useState({username: "guest", loggedIn: false, exp: null});

  return (
    <Router>
        <div className="App">
          <UserContext.Provider value={{user, setUser}}>
            <NavBar></NavBar>
            <Switch>
              <Route path="/"  exact component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/postSnip" component={AddCode}/>
              <Route path="/tab" component={RegistryTab}/>
              <Route path="/show" component={ShowSnippet}/>
              <Route path="/logout" component={Logout}/>
            </Switch>
          </UserContext.Provider>
          
        </div>  
    </Router>
  );
}

export default App;
