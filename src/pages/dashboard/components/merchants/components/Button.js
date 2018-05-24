import React from 'react';

const Button = (props) => (
    <p className={props.className} >
        {/*{props.name} {props.description}*/}
        <button onClick={() => props.click(props.id)}>{props.title}</button>
    </p>
);

export default Button;





