import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DirectoryCard from '../widgets/files/directory_card';

function FileView() {
    const [files, setFiles] = useState([]);
    const { directory } = useParams();

    useEffect(() => {
        async function fetchFiles() {
            try {
                const response = await fetch(`http://localhost/files/${directory}`, {
                    method: 'POST',
                    body: JSON.stringify({ directory }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setFiles(data.files);
            } catch (error) {
                console.error("Failed to fetch files:", error);
            }
        }

        fetchFiles();
    }, [directory]);

    return (
        <div className="file-view">
            {files.map((file) => (
                <Link to={`/reports/${directory}/${file}`} key={file}>
                    <DirectoryCard name={file.name} lastUpdated={file.lastModified} />
                </Link>
            ))}
        </div>
    );
}

export default FileView;
