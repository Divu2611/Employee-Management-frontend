import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Card from '../common/card';

const ShowNotice = ({ notices }) => {

    return (
        <React.Fragment>
            <ToastContainer />
            <Card data={notices} />
        </React.Fragment>
    );
}

export default ShowNotice;