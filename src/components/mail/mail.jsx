import React, { Component } from 'react'
import Joi from 'joi-browser';

import Form from '../common/form';

import auth from '../../services/authService';
import mail from '../../services/mailService';
import department from '../../services/deptService';
import employee from '../../services/employeeService';
import faculty from '../../services/facultyService';
import staff from '../../services/staffService';

class MailForm extends Form {
    state = {
        data: {
            select: "",
            password: "",
            subject: "",
            body: ""
        },
        options: [],
        departments: [],
        errors: {}
    }

    schema = {
        select: Joi.string().required().label("Select"),
        department: Joi.string().label("Department"),
        email: Joi.string().label("To"),
        password: Joi.string().required().label("Password"),
        subject: Joi.string().required().label("Subject"),
        body: Joi.string().required().label("Body")
    }

    render() {
        const options = this.state.options;
        const departments = this.state.departments;

        return (
            <div className="container">
                <div className="card mt-5">

                    <div className="card-header">
                        <h1 className="text-center">Send EMail</h1>
                    </div>

                    <div className="card-body px-5 py-5 bg-white text-black login-right-container">
                        <p style={{ color: "#ff0000", fontStyle: "italic" }}>
                            *You must enable 2-step verification and generate app password before sending mail
                        </p>
                        <form className="ui form" onSubmit={this.handleSubmit}>
                            {this.renderSelect("select", "Select", options)}
                            {this.state.data.select === "Single Employee" && this.renderInput("email", "To")}
                            {this.state.data.select === "Choose Department" && this.renderSelect("department", "Department", departments)}
                            {this.renderInput("password", "App Password", "password")}
                            {this.renderInput("subject", "Subject")}
                            {this.renderTextArea("body", "Body")}
                            {this.renderButton("Mail")}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount = async () => {

        const { data } = await department.getDepartments();

        const options = [
            {
                _id: 1,
                type: "Choose Department"
            },
            {
                _id: 2,
                type: "Single Employee"
            }
        ];

        const departments = [...data];

        this.setState({ options });
        this.setState({ departments });
    }

    doSubmit = async () => {
        const { Contact } = auth.getCurrentEmployee();
        const { password, subject, body, department, email } = this.state.data;

        let to = new Array();
        if (department) {
            let { data: faculties } = await faculty.getFaculties();
            let { data: staffs } = await staff.getStaffs();

            faculties = faculties.filter(faculty => faculty.department[0] === department);
            staffs = staffs.filter(staff => staff.department[0] === department);

            for (let faculty of faculties) {
                const { data } = await employee.getEmployee(faculty.employeeId);
                const { contact } = data;
                const { email } = contact;

                to.push(email);
            }

            for (let staff of staffs) {
                const { data } = await employee.getEmployee(staff.employeeId);
                const { contact } = data;
                const { email } = contact;

                to.push(email);
            }
        } else to.push(email);

        const newMail = {
            from: Contact.email,
            password,
            to,
            subject,
            text: body
        }

        await mail.sendMail(newMail);
        window.location = "/dashboard";
    }
}

export default MailForm;