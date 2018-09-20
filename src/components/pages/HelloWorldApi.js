import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react';

class HelloWorldApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:8000/api/messages',{
                headers: {
                    Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
                }});
            console.log('response',response);
            const data = await response.json();
            console.log('DATA',data[0].message);
            this.setState({messages: data})
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        if(!this.state.messages) return <div>Loading...</div>;

        const items = this.state.messages.map(data => <li key={data.message}>{data.message}</li>);
        console.log(this.state);
        console.log(items)
        return <ul>{items}</ul>
    }
}

export default withAuth(HelloWorldApi);