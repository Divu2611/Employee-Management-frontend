import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import VerticalTable from './common/verticalTable';

import auth from '../services/authService';

import faculty from '../images/faculty.png';
import staff from '../images/staff.png';
import department from '../images/department.png';
import leave from '../images/leave.png';
import mail from '../images/email.png';
import notice from '../images/notice.png'

class Dashboard extends Component {
    state = {
        data: [],
        errors: {}
    }

    render() {

        const employeeDetails = this.state.data;

        return (
            <React.Fragment>

                <h1 className="my-5" style={{ textAlign: "center", fontSize: '50px' }}>Dashboard</h1>

                <VerticalTable data={employeeDetails} heading={"Your Details"} />

                <div className="dashboard row row-cols-1 row-cols-md-6 my-5">

                    <Link to='/faculty' style={{ textDecoration: "none" }}>
                        <div className="col">
                            <div className="card h-100" style={{ backgroundColor: "red" }}>
                                <div className="card-header" style={{ textAlign: "center" }}>
                                    <h3 className="card-title" style={{ color: "white" }}> Faculty </h3>
                                </div>

                                <div className="card-body">
                                    <img className="p-5" src={faculty} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to='/staff' style={{ textDecoration: "none" }}>
                        <div className="col">
                            <div className="card h-100" style={{ backgroundColor: "green" }}>
                                <div className="card-header" style={{ textAlign: "center" }}>
                                    <h3 className="card-title" style={{ color: "white" }}>Staff</h3>
                                </div>

                                <div className="card-body">
                                    <img className="p-5" src={staff} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to='/department' style={{ textDecoration: "none" }}>
                        <div className="col">
                            <div className="card h-100" style={{ backgroundColor: "blue" }}>
                                <div className="card-header" style={{ textAlign: "center" }}>
                                    <h3 className="card-title" style={{ color: "white" }}>Department</h3>
                                </div>

                                <div className="card-body">
                                    <img className="p-5" src={department} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to='/leaves' style={{ textDecoration: "none" }}>
                        <div className="col">
                            <div className="card h-100" style={{ backgroundColor: "cyan" }}>
                                <div className="card-header" style={{ textAlign: "center" }}>
                                    <h3 className="card-title" style={{ color: "white" }}>Leaves</h3>
                                </div>

                                <div className="card-body">
                                    <img className="p-5" src={leave} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to='/mail' style={{ textDecoration: "none" }}>
                        <div className="col">
                            <div className="card h-100" style={{ backgroundColor: "magenta" }}>
                                <div className="card-header" style={{ textAlign: "center" }}>
                                    <h3 className="card-title" style={{ color: "white" }}>Mails</h3>
                                </div>

                                <div className="card-body">
                                    <img className="p-5" src={mail} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to='/notices' style={{ textDecoration: "none" }}>
                        <div className="col">
                            <div className="card h-100" style={{ backgroundColor: "orange" }}>
                                <div className="card-header" style={{ textAlign: "center" }}>
                                    <h3 className="card-title" style={{ color: "white" }}>Notices</h3>
                                </div>

                                <div className="card-body">
                                    <img className="p-5" src={notice} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {

        const { EmployeeType, Personal, Contact } = auth.getCurrentEmployee();
        const employeeType = auth.getCurrentEmployeeType();

        const data = [
            {
                key: 0,
                attribute: "Name",
                value: Personal.name
            },
            {
                key: 1,
                attribute: "E-Mail",
                value: Contact.email
            },
            {
                key: 2,
                attribute: "Phone",
                value: Contact.phone
            },
            {
                key: 3,
                attribute: "Designation",
                value: employeeType.Designation
            },
            {
                key: 4,
                attribute: "Department",
                value: employeeType.Department[0]
            },
            EmployeeType === "Faculty" && {
                key: 5,
                attribute: "Research Area",
                value: employeeType.ResearchArea
            }
        ];

        this.setState({ data });
    }
}

export default Dashboard;