import React from 'react';

const TestPage = props => {
    console.log(props.identity);
    return<div>
        <div className="form-place">
            <h1 className="form-header">I exist because of testing</h1>
        </div>
    </div>;
};

export default TestPage;