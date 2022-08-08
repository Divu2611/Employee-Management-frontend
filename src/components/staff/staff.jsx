import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ShowStaff from './showStaff';

import auth from '../../services/authService';
import staff from '../../services/staffService';
import employee from '../../services/employeeService';

import Pagination from '../common/pagination';

import { paginate } from '../../utils/paginate';

class Staff extends Component {
    state = {
        staffs: [],
        currentPage: 1,
        pageSize: 10
    }

    render() {

        const staffs = this.state.staffs;

        const { currentPage, pageSize } = this.state;
        const staffsByPage = paginate(staffs, currentPage, pageSize);

        const emp = auth.getCurrentEmployee();

        if (staffs) {
            return (
                <div className="mt-5">
                    <h1 className="my-5 py-2 px-5" style={{ backgroundColor: "#D3D3D3" }}>
                        Staffs
                        {emp.isAdmin &&
                            <span style={{ float: "right" }}>
                                <Link to="/staff/new">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </Link>
                            </span>}
                    </h1>
                    <ShowStaff staffs={staffsByPage}
                        emp={emp}
                        onEdit={this.handleEdit}
                        onDelete={this.handleDelete} />
                    <Pagination itemsCount={staffs.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />
                </div>
            );
        }

        return null;
    }

    async componentDidMount() {
        const { data } = await staff.getStaffs();
        const empType = auth.getCurrentEmployeeType();

        for (let staff of data) {
            const { data: emp } = await employee.getEmployee(staff.employeeId);

            staff['designation'] = staff['designation'].toString();
            staff['department'] = empType.Designation[0] === "Director" ? staff['department'][1] : staff['department'][0];
            staff['name'] = emp.personal.name;
            staff['email'] = emp.contact.email;
            staff['phone'] = emp.contact.phone;
            staff['extension'] = emp.contact.address.office;
        }

        let staffs = null;
        if (empType.Department[0] === "Director") staffs = data.filter(staff => staff.department === empType.Department[1]);
        else staffs = data.filter(staff => staff.department === empType.Department[0]);
        this.setState({ staffs });
    }

    handleDelete = async (staff) => {
        await employee.deleteEmployee(staff.employeeId);
        window.location = "/staff";
    }

    handleEdit = async (staff) => {
        window.location = "/staff/edit/" + staff.employeeId;
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }
}

export default Staff;