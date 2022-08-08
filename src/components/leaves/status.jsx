import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HorizontalTable from '../common/horizontalTable';

const Status = ({ leaves }) => {

    const columns = [
        {
            key: 1,
            label: "Start Date",
            property: "startDate"
        },
        {
            key: 2,
            label: "End Date",
            property: "endDate"
        },
        {
            key: 3,
            label: "Description",
            property: "reason"
        },
        {
            key: 4,
            label: "Leave Type",
            property: "leave"
        },
        {
            key: 5,
            label: "Status",
            property: (record) => {
                return record.status;
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

export default Status;