import React from 'react';

const Option = props => {
    return <div className="option">
        <div className="left">
            <img src={props.imgUrl} alt={props.imgAlt} />
        </div>
        <div className="right">
            <h4>{props.title}</h4>
            <p>{props.text}</p>
        </div>
    </div>;
};

export default Option;