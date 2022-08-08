import React from 'react';

import HorizontalTableHeader from './horizontalTableHeader';
import HorizontalTableBody from './horizontalTableBody';

const HorizontalTable = ({ data, columns }) => {
    return (
        <table className="table" style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
            <HorizontalTableHeader columns={columns} />
            <HorizontalTableBody data={data} columns={columns} />
        </table>
    );
}

export default HorizontalTable;