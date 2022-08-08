import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HorizontalTable from '../common/horizontalTable';

const ShowDepartment = ({ departments }) => {

    const columns = [
        {
            key: 0,
            label: "Name",
            property: "name"
        },
        {
            key: 1,
            label: "Description",
            property: "description"
        }
    ];

    return (
        <React.Fragment>
            <ToastContainer />
            <HorizontalTable data={departments} columns={columns} />
        </React.Fragment>
    );
}

export default ShowDepartment;