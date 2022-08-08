import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import ShowFaculty from './showFaculty';

import auth from '../../services/authService';
import faculty from '../../services/facultyService';
import employee from '../../services/employeeService';

import Pagination from '../common/pagination';

import { paginate } from '../../utils/paginate';

class Faculty extends Component {
    state = {
        faculties: [],
        currentPage: 1,
        pageSize: 10
    }

    render() {

        const faculties = this.state.faculties;

        const { currentPage, pageSize } = this.state;
        const facultiesByPage = paginate(faculties, currentPage, pageSize);

        const emp = auth.getCurrentEmployee();

        if (faculties) {

            if (faculties.length === 0)
                return (
                    <div className="tableheading mt-5">
                        <h1>No Faculties</h1>
                    </div>
                );

            return (
                <div className="mt-5">
                    <h1 className="my-5 py-2 px-5" style={{ backgroundColor: "#D3D3D3" }}>
                        Faculties
                        {emp.isAdmin &&
                            <span style={{ float: "right" }}>
                                <Link to="/faculty/new">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </Link>
                            </span>}
                    </h1>
                    <ShowFaculty faculties={facultiesByPage}
                        emp={emp}
                        onEdit={this.handleEdit}
                        onDelete={this.handleDelete} />
                    <Pagination itemsCount={faculties.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />
                </div>
            );
        }

        return null;
    }

    async componentDidMount() {
        const { data } = await faculty.getFaculties();
        const empType = auth.getCurrentEmployeeType();

        for (let faculty of data) {
            const { data: emp } = await employee.getEmployee(faculty.employeeId);

            faculty['designation'] = faculty['designation'].toString();
            faculty['researchArea'] = faculty['researchArea'].toString();
            faculty['department'] = empType.Designation[0] === "Director" ? faculty['department'][1] : faculty['department'][0];
            faculty['name'] = emp.personal.name;
            faculty['email'] = emp.contact.email;
            faculty['phone'] = emp.contact.phone;
            faculty['extension'] = emp.contact.address.office;
        }

        let faculties = null;
        if (empType.Department[0] === "Director") faculties = data.filter(faculty => faculty.department === empType.Department[1]);
        else faculties = data.filter(faculty => faculty.department === empType.Department[0]);
        this.setState({ faculties });
    }

    handleDelete = async (faculty) => {
        await employee.deleteEmployee(faculty.employeeId);
        window.location = "/faculty";
    }

    handleEdit = async (faculty) => {
        window.location = "/faculty/edit/" + faculty.employeeId;
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }
}

export default Faculty;