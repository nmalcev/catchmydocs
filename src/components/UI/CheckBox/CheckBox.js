import React from 'react';
import './CheckBox.css';

const checkbox = props => {
    const className = 'CheckBox ' + (props.className || '');
    return (
        <label className={className}>
            <input 
            	className="CheckBox_input" 
            	type="checkbox" 
            	checked={props.isActive} 
            	onChange={props.onChange}/>
            {props.children}
        </label>
    );
}

export default checkbox;
