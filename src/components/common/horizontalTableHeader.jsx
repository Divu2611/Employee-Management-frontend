import React from 'react';

const HorizontalTableHeader = ({ columns }) => {

    return (
        <thead>
            <tr>
                {columns.map(column => (
                    column &&
                    <th key={column.key}
                        className="col-md-auto"
                        style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                        <h4>{column.label}</h4>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default HorizontalTableHeader;