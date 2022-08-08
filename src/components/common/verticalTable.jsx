import React from 'react';

import VerticalTableHeader from './verticalTableHeader';
import VerticalTableBody from './verticalTablebody';

const VerticalTable = ({ data, heading }) => {
    return (
        <table className="mt-5 table" style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
            <VerticalTableHeader heading={heading} />
            <VerticalTableBody data={data} />
        </table>
    );
}

export default VerticalTable;