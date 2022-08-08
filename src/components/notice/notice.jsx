import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import ShowNotice from './showNotice';

import notice from '../../services/noticeService';

import Pagination from '../common/pagination';

import { paginate } from '../../utils/paginate';

class Notice extends Component {
    state = {
        notices: [],
        currentPage: 1,
        pageSize: 10
    }

    render() {

        const notices = this.state.notices;

        const { currentPage, pageSize } = this.state;
        const noticesByPage = paginate(notices, currentPage, pageSize);

        if (notices) {
            if (notices.length === 0)
                return (
                    <React.Fragment>
                        <h1 className="my-5 py-2 px-5" style={{ backgroundColor: "#D3D3D3" }}>
                            Notice
                            <span style={{ float: "right" }}>
                                <Link to="/notice/new">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </Link>
                            </span>
                        </h1>
                        <div className="tableheading mt-5">
                            <h1>No Notices</h1>
                        </div>
                    </React.Fragment>
                );

            return (
                <div className="mt-5">
                    <h1 className="my-5 py-2 px-5" style={{ backgroundColor: "#D3D3D3" }}>
                        Notice
                        <span style={{ float: "right" }}>
                            <Link to="/notice/new">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </Link>
                        </span>
                    </h1>
                    <ShowNotice notices={noticesByPage} />
                    <Pagination itemsCount={notices.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />
                </div>
            );
        }
        return null;
    }

    componentDidMount = async () => {
        const { data: notices } = await notice.getNotices();
        this.setState({ notices });
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }
}

export default Notice;