import React, { Component } from 'react';
import Rte from '../../UI/RTE/RTE'

class DocumentPage extends Component {
	render() {
        return (
            <>
                <h1>DocumentPage</h1>
                <div style={{width: '100%', height: '80vh', boxSizing:'border-box'}}>
                	<Rte />
                </div>
            </>
        );
	}
}

export default DocumentPage;
