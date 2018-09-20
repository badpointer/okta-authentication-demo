import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback, Auth, SecureRoute } from '@okta/okta-react';
import './App.css';

import Header from './components/Header/Header';
import Home from './components/pages/Home';
import Login from './components/Auth/Login';
import Protected from './components/pages/Protected';
import HelloWorldApi from './components/pages/HelloWorldApi';



const config = {
  issuer: 'https://{yourOktaBaseUrl}.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '{clientId}',
  baseUrl: 'https://{yourOktaBaseUrl}.oktapreview.com'
}

if(!Auth) {
  throw new Error('Auth should be defined');
}

const onAuthRequired = ({history}) => history.push('/login');

class App extends Component {
  render() {
    return (
      <Router>
        <div >
          <Header />
          <Security issuer={config.issuer} 
                    client_id={config.client_id} 
                    redirect_uri={config.redirect_uri} 
                    onAuthRequired={onAuthRequired}>
            <Route path="/" exact component={Home} />
            <Route path="/login" render={() => <Login baseUrl={config.baseUrl}/>} />
            <SecureRoute  path="/protected" component={Protected} />
            <SecureRoute path='/hello' component={HelloWorldApi} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
          </Security>
        </div>
      </Router>
    );
  }
}

export default App;
