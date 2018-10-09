import React from 'react';

const Row = ({data}) => (
    <tr>
        {data.row.map((cell, index) => (
                <td key={index}>{cell}</td>
            ))}
    </tr>

);

export default Row;
