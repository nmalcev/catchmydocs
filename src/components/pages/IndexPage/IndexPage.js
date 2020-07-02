import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import './IndexPage.scss';

const IndexPage = (props) => {
    return (
        <>
            <h1>Catch my docs!</h1>
            <ul>
	            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
	            <li><NavLink to="/document">Document</NavLink></li>
	            <li><NavLink to="/documenttest">Document (test)</NavLink></li>
            </ul>
        </>
    );
};

export default IndexPage;
