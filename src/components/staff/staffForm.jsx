import React from 'react';
import Joi from 'joi-browser'

import Form from '../common/form';

import staff from '../../services/staffService';
import employee from '../../services/employeeService';
import auth from '../../services/authService';

class StaffForm extends Form {

    employeeId = this.props.match.params.id;

    state = {
        data: {
            name: "",
            gender: "",
            dateOfBirth: Date,
            office: "",
            city: "",
            state: "",
            country: "",
            email: "",
            password: "",
            phone: Number,
            degree: "",
            institute: "",
            year: Number,
            designation: "",
            department: ""
        },
        gender: [],
        errors: {}
    };

    schema = {
        name: Joi.string().required().label("Name"),
        gender: Joi.string().required().label("Gender"),
        dateOfBirth: Joi.date().required().label("Date Of Birth"),
        office: Joi.string().required().label("Office No."),
        city: Joi.string().required().label("City"),
        state: Joi.string().required().label("State"),
        country: Joi.string().required().label("Country"),
        email: Joi.string().required().label("E-Mail"),
        phone: Joi.number().required().label("Phone Number"),
        degree: Joi.string().required().label("Degree"),
        institute: Joi.string().required().label("Institute"),
        year: Joi.number().required().label("Year"),
        designation: Joi.string().required().label("Designation"),
        department: Joi.string().required().label("Department")
    };

    doSubmit = async () => {

        const { name, gender, dateOfBirth, office, city, state, country, email, phone, degree, institute, year, designation, department } = this.state.data;

        const designations = designation.split(",");
        const departments = department.split(",");

        const currentEmployee = {
            type: "Staff",
            personal: {
                name,
                gender,
                dateOfBirth
            },
            contact: {
                address: {
                    office,
                    city,
                    state,
                    country
                },
                email,
                phone
            },
            academic: {
                highestEducation: {
                    degree,
                    institute,
                    year
                }
            },
            designation: designations,
            department: departments
        }

        try {

            if (this.employeeId) {
                currentEmployee._id = this.employeeId;
            } else {
                currentEmployee.password = "12345678";
            }

            await employee.saveEmployee(currentEmployee);
            window.location = "/staff";
        } catch (exception) {
            if (exception.response && exception.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.email = exception.response.data;
                this.setState({ errors });
            }
        }
    };

    async componentDidMount() {
        if (this.employeeId) {
            const { data: currentEmployee } = await employee.getEmployee(this.employeeId);
            const { data: currentEmployeeType } = await staff.getStaff(this.employeeId);

            const { name, gender, dateOfBirth } = currentEmployee.personal;
            const { address, email, phone } = currentEmployee.contact;
            const { office, city, state, country } = address;
            const { degree, institute, year } = currentEmployee.academic.highestEducation;

            let { designation, department } = currentEmployeeType;

            designation = designation.toString();
            department = department.toString();

            const data = {
                name,
                gender,
                dateOfBirth,
                office,
                city,
                state,
                country,
                email,
                phone,
                degree,
                institute,
                year,
                designation,
                department
            }
            this.setState({ data });
        } else {
            const empType = auth.getCurrentEmployeeType()
            const department = empType.Department[0];

            const data = {
                department
            }
            this.setState({ data });
        }

        const gender = [
            {
                key: 0,
                type: "Male"
            },
            {
                key: 1,
                type: "Female"
            }
        ]
        this.setState({ gender });
    }

    render() {

        const gender = this.state.gender;

        return (
            <div className="container">
                <div className="card mt-5">

                    <div className="card-header">
                        <h1 className="text-center">Details</h1>
                    </div>

                    <div className="card-body px-5 py-5 bg-white text-black login-right-container">
                        <form onSubmit={this.handleSubmit}>
                            <br></br>
                            <h3>Personal</h3>
                            {this.renderInput("name", "Name")}
                            {this.renderSelect("gender", "Gender", gender)}
                            {this.renderInput("dateOfBirth", "Date Of Birth", "date")}
                            <br></br>
                            <hr style={{ border: "2.5px solid black" }}></hr>
                            <br></br>
                            <h3>Contact</h3>
                            <h5>Address</h5>
                            {this.renderInput("office", "Office")}
                            {this.renderInput("city", "City")}
                            {this.renderInput("state", "State")}
                            {this.renderInput("country", "Country")}
                            <hr style={{ border: "1.25px solid black" }}></hr>
                            {this.renderInput("email", "E-Mail")}
                            {this.renderInput("phone", "Phone")}
                            <br></br>
                            <hr style={{ border: "2.5px solid black" }}></hr>
                            <br></br>
                            <h4>Academic</h4>
                            {this.renderInput("degree", "Degree")}
                            {this.renderInput("institute", "Institute")}
                            {this.renderInput("year", "Year")}
                            <br></br>
                            <hr style={{ border: "2.5px solid black" }}></hr>
                            <br></br>
                            <h4>Designation</h4>
                            {this.renderInput("designation", "Designation")}
                            {this.renderInput("department", "Department")}
                            <br></br>
                            <hr style={{ border: "2.5px solid black" }}></hr>
                            <br></br>
                            {this.employeeId ? this.renderButton("Update") : this.renderButton("Register")}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default StaffForm;