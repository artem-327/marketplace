import React from 'react';

const Row = ({data}) => (
    <tr>
        {data.map((cell, index) => (
                <td key={index}>{cell}</td>
            ))}
    </tr>

);

export default Row;
