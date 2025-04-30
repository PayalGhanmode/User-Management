import React from 'react';
import "./Dashboard.css";

const View = ({result}) => {

    return (<>
    <div className='view'>
    <h4>{result.firstname}</h4>
    <h4>{result.lastname}</h4>
    <h4>{result.email}</h4>
    </div>
    </>)


}

export default View;