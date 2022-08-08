import React from 'react';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';

import Form from './common/form';

import auth from '../services/authService';
class LoginForm extends Form {

    state = {
        data: {
            email: "",
            password: ""
        },

        errors: {}
    };

    schema = {
        email: Joi.string().required().label('E-Mail'),
        password: Joi.string().min(8).required().label('Password')
    };

    doSubmit = async () => {
        try {
            await auth.authenticate(this.state.data);
            window.location = "/dashboard";
        } catch (exception) {
            if (exception.response && exception.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.email = exception.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {
        return (

            <div className="container">
                <div className="card mt-5">

                    <div className="card-header">
                        <h1 className="text-center">Login</h1>
                    </div>
                    <div className="card-body px-5 py-5 bg-white text-black login-right-container">
                        <form className="ui form" onSubmit={this.handleSubmit}>
                            {this.renderInput("email", "E-Mail")}
                            {this.renderInput("password", "Password", "password")}
                            {this.renderButton("Login")}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;