import React from 'react';
import { TextControl, Button } from '@wordpress/components';

const axios = require('axios');

class Login extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { username: '', password: '' }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername( username ) {
        this.setState( { username } )
    }

    handlePassword( password ) {
        this.setState( { password } )
    }


    handleSubmit( e ) {
        e.preventDefault();
        const _this = this;
        axios.post( this.props.url + '/wp-json/jwt-auth/v1/token/',
        {
            username: this.state.username,
            password: this.state.password
        })
        .then(function (response) {
            if ( response.status === 200 ) {
                const data = response.data;
                localStorage.setItem( 'login', data.token ); 
                _this.props.setLogin( data.token );
            }
        })
        .catch(function (error) {
            function strip_html_tags(str) {
                if ((str===null) || (str===''))
                    return false;
                else
                str = str.toString();
                return str.replace(/<[^>]*>/g, '');
            }
            alert( strip_html_tags( error.response.data.message ) );
        });
    }


    
    render() {
        return (
            <form className="login" method="post">
                <TextControl className="form-group" 
                    label="Username"
                    value={ this.state.username }
                    onChange={ (value) => this.handleUsername( value ) }
                />
                <TextControl className="form-group" 
                    label="Password"
                    type="password"
                    onChange={ (value) => this.handlePassword( value ) }
                />
                <Button isPrimary onClick={this.handleSubmit}>Login</Button>
            </form>
        );
    }

}

export default Login;