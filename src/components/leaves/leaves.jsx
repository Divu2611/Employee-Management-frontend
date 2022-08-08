import React from 'react';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';

import Status from './status';

import Form from '../common/form';
import Pagination from '../common/pagination';

import auth from '../../services/authService';
import record from '../../services/recordService';
import leave from '../../services/leaveService';

import { paginate } from '../../utils/paginate';

class Leave extends Form {
    state = {
        data: {
            leave: "",
            startDate: String,
            endDate: String
        },

        leaves: [],

        leaveRecords: [],
        currentPage: 1,
        pageSize: 4,

        errors: {}
    }

    schema = {
        leave: Joi.string().required().label("Leave").valid("Sick Leave", "Annual Leave", "Paternity Leave", "Maternity Leave", "Study Leave"),
        startDate: Joi.string().required().label("Start Date"),
        endDate: Joi.string().required().label("End Date"),
        reason: Joi.string().label("Reason")
    }

    componentDidMount = async () => {
        const { data } = await leave.getLeaves();
        const leaves = [...data];
        this.setState({ leaves });

        const { ID } = auth.getCurrentEmployee();
        const { data: records } = await record.getRecords();
        const leaveRecords = records.filter(record => record.employee.id === ID);
        this.setState({ leaveRecords });
    }

    doSubmit = async () => {

        const { leave, startDate, endDate, reason } = this.state.data;
        const status = leave !== "Sick Leave" ? "Pending" : null;
        const { ID } = await auth.getCurrentEmployee();

        const currentRecord = {
            employeeId: ID,
            leave,
            startDate,
            endDate,
            reason,
            status,
        };

        await record.saveRecord(currentRecord);
        window.location = "/leaves";
    }

    render() {

        const leaves = this.state.leaves;
        const records = this.state.leaveRecords;
        const employee = auth.getCurrentEmployee();
        const employeeType = auth.getCurrentEmployeeType();

        if (records) {

            const { currentPage, pageSize } = this.state;
            const recordsByPage = paginate(records, currentPage, pageSize);

            if (records.length === 0) {
                return (
                    <React.Fragment>
                        {
                            employeeType.Designation[0] !== "Director" &&
                            <React.Fragment>
                                <div className="container">
                                    <div className="card mt-5">

                                        <div className="card-header">
                                            <h1 className="text-center">Apply For Leave</h1>
                                        </div>

                                        <div className="card-body px-5 py-5 bg-white text-black login-right-container">
                                            <form className="ui form" onSubmit={this.handleSubmit}>
                                                {this.renderSelect("leave", "Leave", leaves)}
                                                {this.renderInput("startDate", "Start Date", "date")}
                                                {this.renderInput("endDate", "End Date", "date")}
                                                {this.state.data.leave !== "Sick Leave" && this.renderTextArea("reason", "Reason")}
                                                {this.renderButton("Apply")}
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="tableheading mt-5">
                                    <h1 className="my-4 py-2 px-5" style={{ backgroundColor: "#D3D3D3" }}> My Leaves </h1>
                                    <h3>No Leaves Applied Yet</h3>
                                </div>
                            </React.Fragment>
                        }

                        {employee.isAdmin &&
                            <div className="mt-3">
                                <h3>
                                    <Link to="/leaves/handle" style={{ textDecoration: "None" }}>
                                        Handle Leaves
                                    </Link>
                                </h3>
                            </div>}
                    </React.Fragment>
                );
            }

            return (
                <React.Fragment>
                    {
                        employeeType.Designation[0] !== "Director" &&
                        <React.Fragment>
                            <div className="container">
                                <div className="card mt-5">

                                    <div className="card-header">
                                        <h1 className="text-center">Apply For Leave</h1>
                                    </div>

                                    <div className="card-body px-5 py-5 bg-white text-black login-right-container">
                                        <form className="ui form" onSubmit={this.handleSubmit}>
                                            {this.renderSelect("leave", "Leave", leaves)}
                                            {this.renderInput("startDate", "Start Date", "date")}
                                            {this.renderInput("endDate", "End Date", "date")}
                                            {this.state.data.leave !== "Sick Leave" && this.renderTextArea("reason", "Reason")}
                                            {this.renderButton("Apply")}
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <h1 className="my-5 py-2 px-5" style={{ backgroundColor: "#D3D3D3" }}>My Leaves</h1>

                                <Status leaves={recordsByPage}
                                    onStatusChange={this.handleStatus} />

                                <Pagination itemsCount={records.length}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={this.handlePageChange} />
                            </div>
                        </React.Fragment>
                    }

                    {employee.isAdmin &&
                        <div className="mt-3">
                            <h3>
                                <Link to="/leaves/handle" style={{ textDecoration: "None" }}>
                                    Handle Leaves
                                </Link>
                            </h3>
                        </div>}
                </React.Fragment>
            );
        }
        return null;
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }
}

export default Leave;