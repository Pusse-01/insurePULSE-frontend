import React from 'react';
import { useParams } from 'react-router-dom';

function FileDetails() {
    const { directory, file } = useParams();

    return (
        <div className="file-details">
            <h3>{file}</h3>
            <p>Directory: {directory}</p>
        </div>
    );
}

export default FileDetails;
