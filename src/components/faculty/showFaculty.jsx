import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HorizontalTable from '../common/horizontalTable';

const ShowFaculty = ({ faculties, emp, onEdit, onDelete }) => {

    const columns = [
        {
            key: 1,
            label: "Name",
            property: "name"
        },
        {
            key: 2,
            label: "Email",
            property: "email"
        },
        {
            key: 3,
            label: "Phone",
            property: "phone"
        },
        {
            key: 4,
            label: "Designation",
            property: "designation"
        },
        {
            key: 5,
            label: "Department",
            property: "department"
        },
        {
            key: 0,
            label: "Reseach Area",
            property: "researchArea"
        },
        {
            key: 6,
            label: "Office Ext.",
            property: "extension"
        },
        {
            key: 7,
            label: "Action",
            property: (faculty) => {
                return (
                    <React.Fragment>
                        <button onClick={() => onEdit(faculty)}
                            disabled={!emp.isAdmin || emp.ID === faculty.employeeId}
                            className="btn btn-info btn-sm mx-2">
                            Edit
                        </button>

                        <button onClick={() => onDelete(faculty)}
                            disabled={!emp.isAdmin || emp.ID === faculty.employeeId}
                            className="btn btn-danger btn-sm mx-2">
                            Delete
                        </button>
                    </React.Fragment>
                )
            }
        }
    ];

    return (
        <React.Fragment>
            <ToastContainer />
            <HorizontalTable data={faculties} columns={columns} />
        </React.Fragment>
    );
}

export default ShowFaculty;