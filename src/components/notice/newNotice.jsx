import React, { Component } from 'react'
import Joi from 'joi-browser';

import Form from '../common/form';

import auth from '../../services/authService';
import notice from '../../services/noticeService';

import today from '../../utils/newDate';

class NewNotice extends Form {
    state = {
        data: {
            title: "",
            body: ""
        },
        errors: {}
    }

    schema = {
        title: Joi.string().required().label("Title"),
        body: Joi.string().required().label("Body")
    }

    render() {
        return (
            <div className="container">
                <div className="card mt-5">

                    <div className="card-header">
                        <h1 className="text-center">Add Notice</h1>
                    </div>

                    <div className="card-body px-5 py-5 bg-white text-black login-right-container">
                        <form className="ui form" onSubmit={this.handleSubmit}>
                            {this.renderInput("title", "Title")}
                            {this.renderTextArea("body", "Body")}
                            {this.renderButton("Add")}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    doSubmit = async () => {
        const { Personal } = auth.getCurrentEmployee();
        const { title, body } = this.state.data;

        const newNotice = {
            title,
            body,
            author: Personal.name,
            date: today.today
        }

        await notice.saveNotice(newNotice);
        window.location = "/notices";
    }
}

export default NewNotice;