// export default DirectoryList;
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { Icon, MenuItem, Select } from '@mui/material';
// import { CloudDownload, Description, GetApp } from '@mui/icons-materia';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DescriptionIcon from '@mui/icons-material/Description';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Reports() {
    const [directories, setDirectories] = useState({});
    const [currentPath, setCurrentPath] = useState('');
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pathParam = searchParams.get('path');

    useEffect(() => {
        fetchDirectoryPaths();
        setCurrentPath(pathParam || '');
    }, [pathParam]);

    const fetchDirectoryPaths = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/directories');
            const data = await response.json();
            setDirectories(data);
        } catch (error) {
            console.error('Error fetching directory paths:', error);
        }
    };

    const handleCardClick = (path) => {
        setCurrentPath(path);
        const breadcrumb = [...breadcrumbs, { name: path, path }];
        setBreadcrumbs(breadcrumb);
    };

    const handleBreadcrumbClick = (index) => {
        const breadcrumb = breadcrumbs.slice(0, index + 1);
        setCurrentPath(breadcrumb[index].path);
        setBreadcrumbs(breadcrumb);
    };

    // const handleFormatChange = (event, path) => {
    //     console.log(event.target.value, path);

    // }

    const handleFormatChange = (event, path) => {
        const format = event.target.value;

        // Create the request body
        const requestBody = {
            path: path,
            format: format
        };

        // Make the API request
        fetch('http://127.0.0.1:8000/download-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                // Extract the Base64 file from the response
                const base64File = data.file;

                // Create a temporary <a> element to trigger the file download
                const link = document.createElement('a');
                link.href = `data:application/octet-stream;base64,${base64File}`;
                link.download = `converted_file.${format}`;
                link.target = '_blank';

                // Programmatically trigger the click event to start the download
                link.click();

                // Clean up the <a> element
                link.remove();
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error in your application
            });
    };

    const renderCards = () => {
        const currentDirectory = getDirectoryByPath(currentPath);

        if (currentDirectory) {
            return Object.keys(currentDirectory).map((name) => {
                const item = currentDirectory[name];
                const path = currentPath === '' ? name : `${currentPath}/${name}`;
                const isFile = typeof item === 'object' && item == null;

                if (isFile) {
                    return (
                        // <div
                        //     key={path}
                        //     className="bg-white p-4 rounded shadow mx-4 text-left flex flex-row"
                        // >
                        //     <h2 className="font-bold mb-2">{name}</h2>
                        //     <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        //         View File
                        //     </button>
                        // </div>
                        <div key={path} className="bg-white p-4 rounded shadow mx-4 text-left flex flex-row">
                            <DescriptionIcon className="text-gray-500 mr-2" /> {/* File icon */}
                            <h2 className="font-bold mb-2">{name}</h2>
                            <div className="flex-grow" /> {/* Spacer */}
                            <div className="relative">
                                {/* <button className="bg-blue-500 text-white px-2 py-1 rounded">
                                    <GetAppIcon className="mr-2" /> 
                                    Download
                                </button> */}
                                {/* <div className="absolute right-0 mt-2 mr-2"> */}
                                <FormControl sx={{ m: 1, minWidth: 20 }} size="small">
                                    {/* <InputLabel id="demo-select-small-label">Download</InputLabel> */}
                                    <Select
                                        id="demo-select-small"
                                        value="download" // Set the selected format here
                                        // label="Download"
                                        onChange={
                                            (event) =>
                                                handleFormatChange(event, path)
                                        }
                                        className="text-gray-600 pl-2"
                                        IconComponent={GetAppRoundedIcon}

                                    >
                                        <MenuItem value="csv">CSV</MenuItem>
                                        <MenuItem value="xlsx">Excel</MenuItem>
                                        <MenuItem value="pdf">PDF</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* </div> */}
                            </div>
                        </div>
                    );
                }

                return (
                    <Link
                        key={path}
                        to={`/reports?path=${encodeURIComponent(path)}`}
                        className="flex flex-row bg-white p-4 rounded shadow-md mx-4 mb-4 block hover:bg-gray-300"
                    >
                        <FolderOpenOutlinedIcon />
                        <h2 className="font-bold mb-2 ml-3">{name}</h2>
                        {/* <span className="text-gray-500">Folder</span> */}
                    </Link>
                );
            });
        }

        return null;
    };

    const getDirectoryByPath = (path) => {
        let currentDirectory = directories;

        if (path) {
            const pathParts = path.split('/');

            for (let i = 0; i < pathParts.length; i++) {
                const part = pathParts[i];
                if (currentDirectory[part]) {
                    currentDirectory = currentDirectory[part];
                } else {
                    currentDirectory = null;
                    break;
                }
            }
        }

        return currentDirectory;
    };

    const renderBreadcrumbs = () => {
        return breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
                {index > 0 && <span className="mx-2">{'>'}</span>}
                <button
                    className="underline"
                    onClick={() => handleBreadcrumbClick(index)}
                >
                    {breadcrumb.name}
                </button>
            </React.Fragment>
        ));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Reports</h1>
            <div className="mx-auto mb-4">{renderBreadcrumbs()}</div>
            <div className='w-1/2 mx-auto text-left'>{renderCards()}</div>
        </div>
    );
}

export default Reports;
