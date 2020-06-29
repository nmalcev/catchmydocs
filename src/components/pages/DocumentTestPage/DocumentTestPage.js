import React, { Component } from 'react';
import Rte from '../../UI/RTE_contenteditable/RTE'

class DocumentTestPage extends Component {
	render() {
        return (
            <>
                <h1>New documentPage</h1>
                <div style={{width: '100%', height: '80vh', boxSizing:'border-box', border: '1px solid #ccc'}}>
                	<Rte />
                </div>
            </>
        );
	}
}

export default DocumentTestPage;
