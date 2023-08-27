import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './scss/App.css'
import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App =() => {

    return (
    <BrowserRouter>
    <Container /* className={"toggle" + (isShowing ? "On" : "Off")} */>
        <NavBar/>
        <Switch>
         <Route  exact path= "/"  component={Home} />
         <Route  path= "/auth" component={Auth} exact/>
        </Switch>
     </Container>
    </BrowserRouter>
    );
};

export default App;