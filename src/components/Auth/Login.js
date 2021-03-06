import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import SignUp from './SignUp';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: null
    };
    this.checkAuthentication();
  }

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      console.log('Set state, Authenticated!')
      this.setState({ authenticated });
    }
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  onSuccess = res => {
    if (res.status === 'SUCCESS') {
      return this.props.auth.redirect({ sessionToken: res.session.token });
    } else {
      // The user can be in another authentication state that requires further action.
      // For more information about these states, see:
      //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  }

  onError = err => {
    console.log('Error logging in',err);
  }


  render() {

    if(this.state.authenticated === null) return null;

    return this.state.authenticated ? 
      <Redirect to={{pathname: '/'}} /> :
      <SignUp
        baseUrl={this.props.baseUrl}
        onSuccess={this.onSuccess}
        onError={this.onError}/>
    }
}

export default withAuth(Login);
