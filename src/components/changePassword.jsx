import React, { Component } from 'react'
import Joi from 'joi-browser';

import Form from '../components/common/form';

import auth from '../services/authService';
import employee from '../services/employeeService';

class ChangePassword extends Form {
    state = {
        data: {
            password: "",
            confirmPassword: ""
        },
        errors: {}
    }

    schema = {
        password: Joi.string().min(8).required().label("Password"),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')).label("Confirm Password").error(() => {
            return {
                message: "Password doesn't match"
            }
        })
    }

    render() {

        return (
            <div className="container" >
                <div className="card mt-5">

                    <div className="card-header">
                        <h1 className="text-center">Change Password</h1>
                    </div>

                    <div className="card-body px-5 py-5 bg-white text-black login-right-container">
                        <form className="ui form" onSubmit={this.handleSubmit}>
                            {this.renderInput("password", "Password", "password")}
                            {this.renderInput("confirmPassword", "Confirm Password", "password")}
                            {this.renderButton("Change Password")}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    doSubmit = async () => {
        const { ID } = auth.getCurrentEmployee();

        const newPassword = {
            _id: ID,
            password: this.state.data.password
        }

        await employee.saveEmployee(newPassword);
        window.location = "/logout";
    }
}

export default ChangePassword;