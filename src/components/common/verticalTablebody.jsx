import React from 'react';

const VerticalTableBody = ({ data }) => {

    return (
        <tbody>
            {data.map(item => (
                item &&
                <tr key={item.key} style={{ backgroundColor: "#F6BE00" }}>
                    <th style={{ fontSize: "20px" }}>{item.attribute}</th>
                    <td style={{ fontSize: "20px" }}>{item.value.toString()}</td>
                </tr>
            ))}
        </tbody>
    );
}

export default VerticalTableBody;