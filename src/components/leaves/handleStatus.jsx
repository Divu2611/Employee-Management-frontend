import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HorizontalTable from '../common/horizontalTable';

const HandleStatus = ({ leaves, employeeType, onStatusChange }) => {

    const columns = [
        {
            key: 1,
            label: "Employee Name",
            property: "employee.name"
        },
        {
            key: 2,
            label: "Employee E-Mail",
            property: "employee.email"
        },
        employeeType.Designation[0] === "Director" && {
            key: 0,
            label: "Department",
            property: "employee.department"
        },
        {
            key: 3,
            label: "Start Date",
            property: "startDate"
        },
        {
            key: 4,
            label: "End Date",
            property: "endDate"
        },
        {
            key: 5,
            label: "Description",
            property: "reason"
        },
        {
            key: 6,
            label: "Leave Type",
            property: "leave"
        },
        {
            key: 7,
            label: "Status",
            property: (record) => {
                if (record.status === 'Approved' || record.status === 'Rejected') return record.status;
                else if (record.status === 'Pending') {
                    return (
                        <React.Fragment>
                            <button onClick={() => onStatusChange("Approved", record)}
                                className="btn btn-success btn-sm mx-2">
                                Approve
                            </button>

                            <button onClick={() => onStatusChange("Rejected", record)}
                                className="btn btn-danger btn-sm mx-2">
                                Reject
                            </button>
                        </React.Fragment>
                    );
                }
            }
        }
    ];

    return (
        <React.Fragment>
            <ToastContainer />
            <HorizontalTable data={leaves} columns={columns} />
        </React.Fragment>
    );
}

export default HandleStatus;