import React, { Component } from 'react';

import ShowDepartment from './showDepartment';

import department from '../../services/deptService';

import Pagination from '../common/pagination';

import { paginate } from '../../utils/paginate';

class Department extends Component {
    state = {
        departments: [],

        currentPage: 1,
        pageSize: 10,
    }

    render() {

        const departments = this.state.departments;

        const { currentPage, pageSize } = this.state;
        const departmentsByPage = paginate(departments, currentPage, pageSize);

        if (departments) {

            if (departments.length === 0)
                return (
                    <div className="tableheading mt-5">
                        <h1>No Departments</h1>
                    </div>)

            return (
                <div className="mt-5">
                    <h1 className="my-5 py-2 px-5" style={{ backgroundColor: "#D3D3D3" }}>
                        Departments
                    </h1>

                    <ShowDepartment departments={departmentsByPage} />
                    <Pagination itemsCount={departments.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />
                </div>
            );
        }

        return null;
    }

    async componentDidMount() {
        const { data } = await department.getDepartments();

        const departments = [...data];
        this.setState({ departments });
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }
}

export default Department;