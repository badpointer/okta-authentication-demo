import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import "./Styles.css";

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

    renderMaterialButton = () => {
        return this.state.authenticated ?
                 <Button variant="contained" 
                         color="secondary" 
                         onClick={this.logout}>
                Logout
                </Button> : 
                <Button variant="contained" 
                        color="primary" 
                        onClick={this.login}>
                Login
                </Button>;
    }

    render() {
        if(this.state.authenticated === null) return null;
        return (
            <div className="container" >
                {/* <Link to="/">Home</Link><br/>
                <Link to="/protected">Protected Page</Link><br/>
                {this.renderButton()}                 */}
                <Paper>
                   
                    <div className="image-logo-container">
                        <img src={require('../../img/Okta_Logo_BrightBlue_Medium.png')} width="375" height="200" />
                    </div>
                    <div>
                        <Typography style={{fontSize: 18,fontWeight: 400}}  align="center" className="body-container">
                            This React Okta Demo authenticate a user with Okta Developer Account.
                            You can log in by pressing the button below. 
                            Once logged in you will see pages that will navigate  pages to
                            test a REST API coming from a secure server using Okta.
                        </Typography>
                    </div>
                    <br/>
                    <Divider />
                    <div className="button-container ">
                        {this.renderMaterialButton()}
                    </div>
                </Paper>
            </div>
        )
    }
}


export default withAuth(Home);