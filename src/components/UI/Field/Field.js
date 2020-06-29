import React from 'react';
import './Field.css';

const field = props => {
    let InputElement;
    
    switch(props.elementType) {
        case 'textarea': InputElement = null; break; 
        default: InputElement = <input {...props.elementConfig}/>;
    }
    // <fieldset>

    return (
        <label className="Field">
            <label className="Field_label">{props.elementLabel}</label>
            {InputElement}
        </label>
    );
}

export default field;
