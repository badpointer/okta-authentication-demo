import React, { Component } from 'react'
import {withAuth} from '@okta/okta-react';

class Protected extends Component {
    constructor(props) {
        super(props);
        this.state = {userInfo: null};
    }

    async componentDidMount() {
        const claims = await this.props.auth.getUser();
        const userInfo = JSON.stringify(claims,null,4);
        const auth = {Authorization: 'Bearer ' + await this.props.auth.getAccessToken()}
        console.log(auth);
        this.setState({userInfo});

    }

  render() {
    return (
      <div>
        <h1>Protected Page</h1>
        {this.state.userInfo && <pre>{this.state.userInfo}</pre>}
      </div>
    )
  }
}

export default withAuth(Protected);
