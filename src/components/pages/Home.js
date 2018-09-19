import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: null
        }
        this.checkAuthentication();
    }

    checkAuthentication = async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if(authenticated !== this.state.authenticated) {
            this.setState({authenticated});
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.checkAuthentication();
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    login = async () => {
        // Redirect to '/' after login
        this.props.auth.login('/protected');
    }

    logout = async () => {
        // Redirect to '/' after logout
        this.props.auth.logout('/');
    }

    renderButton = () => {
        return this.state.authenticated ? <button onClick={this.logout} >Logout</button> : <button onClick={this.login}>Login</button>;
    }

    render() {
        if(this.state.authenticated === null) return null;
        return (
            <div>
                <Link to="/">Home</Link><br/>
                <Link to="/protected">Protected Page</Link><br/>
                {this.renderButton()}                
            </div>
        )
    }
}


export default withAuth(Home);