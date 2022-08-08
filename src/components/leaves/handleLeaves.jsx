import React, { Component } from 'react';

import HandleStatus from './handleStatus';

import record from '../../services/recordService';
import mail from '../../services/mailService';

import Pagination from '../common/pagination';

import { paginate } from '../../utils/paginate';

import config from "../../config/config.json";

class HandleRecord extends Component {
    state = {
        records: [],

        currentPage: 1,
        pageSize: 10,
    }

    employeeType = this.props.empType;

    render() {
        const records = this.state.records;

        const { currentPage, pageSize } = this.state;
        const recordsByPage = paginate(records, currentPage, pageSize);

        if (records) {

            if (records.length === 0)
                return (
                    <div className="tableheading mt-5">
                        <h1>No Records</h1>
                    </div>)

            return (
                <div className="mt-5">
                    <h1 className="my-5 py-2 px-5" style={{ backgroundColor: "#D3D3D3" }}>
                        Handle Records
                    </h1>
                    <HandleStatus leaves={recordsByPage}
                        employeeType={this.employeeType}
                        onStatusChange={this.handleStatus} />
                    <Pagination itemsCount={records.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />
                </div>
            );
        }

        return null;
    }

    async componentDidMount() {
        const { data } = await record.getRecords();

        let records = null;
        if (this.employeeType.Designation[0] === "Director") records = data.filter(record => record.employee.department === this.employeeType.Department[1] && record.employee.id !== this.employeeType.EmployeeId);
        else records = data.filter(record => record.employee.department === this.employeeType.Department[0] && record.employee.id !== this.employeeType.EmployeeId);
        this.setState({ records });
    }

    handleStatus = async (status, currentRecord) => {
        const originalRecords = this.state.records;
        var r = originalRecords.find(r => r._id === currentRecord._id);

        r.status = status;

        await record.saveRecord(r);

        const newMail = {
            from: config.email,
            password: process.env.REACT_APP_PASSWORD,
            to: r.employee.email,
            subject: "Leave Update",
            text:
                "Dear " + r.employee.name + "!!\n" +
                "Your " + r.leave + " from " + r.startDate + " to " + r.endDate + " has been " + r.status + ".\n\n" +
                "Leave Details:\n" +
                "Type - " + r.leave + "\n" +
                "Start Date - " + r.startDate + "\n" +
                "End Date - " + r.endDate + "\n" +
                "Status - " + r.status
        };
        await mail.sendMail(newMail);

        window.location = "/leaves/handle";
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }
}

export default HandleRecord;