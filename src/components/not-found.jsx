import React from 'react';

const NotFound = () => {
    console.log(process.env.REACT_APP_API_URL);
    return (
        <h1 className="mt-5">
            Not Found
        </h1>
    );
}

export default NotFound;