import React from 'react';

const VerticalTableHeader = ({ heading }) => {
    return (
        <thead>
            <tr className="tableHeading" style={{ backgroundColor: "#D3D3D3" }}>
                <th colSpan={2}>
                    <h2> {heading} </h2>
                </th>
            </tr>
        </thead>
    );
}

export default VerticalTableHeader;