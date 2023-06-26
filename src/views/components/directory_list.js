// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
// import { Icon, MenuItem, Select, Button, Modal } from '@mui/material';
// import DescriptionIcon from '@mui/icons-material/Description';
// import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';

// function Reports() {
//     const [directories, setDirectories] = useState({});
//     const [currentPath, setCurrentPath] = useState('');
//     const [breadcrumbs, setBreadcrumbs] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [reportType, setReportType] = useState('');
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [zone, setZone] = useState('');
//     const [branch, setBranch] = useState('');

//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const pathParam = searchParams.get('path');

//     useEffect(() => {
//         fetchDirectoryPaths();
//         setCurrentPath(pathParam || '');
//     }, [pathParam]);

//     const fetchDirectoryPaths = async () => {
//         try {
//             const response = await fetch('http://127.0.0.1:8000/directories');
//             const data = await response.json();
//             setDirectories(data);
//         } catch (error) {
//             console.error('Error fetching directory paths:', error);
//         }
//     };

//     const handleCardClick = (path) => {
//         setCurrentPath(path);
//         const breadcrumb = [...breadcrumbs, { name: path, path }];
//         setBreadcrumbs(breadcrumb);
//     };

//     const handleBreadcrumbClick = (index) => {
//         const breadcrumb = breadcrumbs.slice(0, index + 1);
//         setCurrentPath(breadcrumb[index].path);
//         setBreadcrumbs(breadcrumb);
//     };

//     const handleFormatChange = (event, path) => {
//         const format = event.target.value;

//         const requestBody = {
//             path: path,
//             format: format,
//         };

//         fetch('http://127.0.0.1:8000/download-file', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(requestBody),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 const base64File = data.file;

//                 const link = document.createElement('a');
//                 link.href = `data:application/octet-stream;base64,${base64File}`;
//                 link.download = `converted_file.${format}`;
//                 link.target = '_blank';

//                 link.click();

//                 link.remove();
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     };

// const renderCards = () => {
//     const currentDirectory = getDirectoryByPath(currentPath);
//     if (currentDirectory) {
//         console.log(currentDirectory)
//         return Object.keys(currentDirectory).map((name) => {
//             const item = currentDirectory[name];
//             const path = currentPath === '' ? name : `${currentPath}/${name}`;
//             const isFile = typeof item === 'object' && item == null;
//             console.log(currentPath, item);
//             if (isFile) {
//                 return (
//                     <div
//                         key={path}
//                         className="bg-white p-4 rounded shadow mx-4 text-left flex flex-row"
//                     >
//                         <DescriptionIcon className="text-gray-500 mr-2" />
//                         <h2 className="font-bold mb-2">{name}</h2>
//                         <div className="flex-grow" />
//                         <div className="relative">
//                             <FormControl sx={{ m: 1, minWidth: 20 }} size="small">
//                                 <Select
//                                     id="demo-select-small"
//                                     value="download"
//                                     onChange={(event) => handleFormatChange(event, path)}
//                                     className="text-gray-600 pl-2"
//                                     IconComponent={GetAppRoundedIcon}
//                                 >
//                                     <MenuItem value="csv">CSV</MenuItem>
//                                     <MenuItem value="xlsx">Excel</MenuItem>
//                                     <MenuItem value="pdf">PDF</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </div>
//                     </div>
//                 );
//             }

//             return (
//                 <Link
//                     key={path}
//                     to={`/reports?path=${encodeURIComponent(path)}`}
//                     className="flex flex-row bg-white p-4 rounded shadow-md mx-4 mb-4 block hover:bg-gray-300"
//                 >
//                     <FolderOpenOutlinedIcon />
//                     <h2 className="font-bold mb-2 ml-3">{name}</h2>
//                 </Link>
//             );
//         });
//     }

//     return null;
// };

//     const getDirectoryByPath = (path) => {
//         let currentDirectory = directories;

//         if (path) {
//             const pathParts = path.split('/');

//             for (let i = 0; i < pathParts.length; i++) {
//                 const part = pathParts[i];
//                 if (currentDirectory[part]) {
//                     currentDirectory = currentDirectory[part];
//                 } else {
//                     currentDirectory = null;
//                     break;
//                 }
//             }
//         }

//         return currentDirectory;
//     };

//     const renderBreadcrumbs = () => {
//         return breadcrumbs.map((breadcrumb, index) => (
//             <React.Fragment key={index}>
//                 {index > 0 && <span className="mx-2">{'>'}</span>}
//                 <button
//                     className="underline"
//                     onClick={() => handleBreadcrumbClick(index)}
//                 >
//                     {breadcrumb.name}
//                 </button>
//             </React.Fragment>
//         ));
//     };

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         // Call the backend endpoint with the form data
//         const formData = {
//             reportType,
//             startDate,
//             endDate,
//             zone,
//             branch,
//         };

//         fetch('http://127.0.0.1:8000/download', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 // Handle the response
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     };

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4 pt-4">Reports</h1>
//             <Button onClick={() => setShowForm(true)}>
//                 Download Customized Report
//             </Button>
//             <Modal open={showForm} onClose={() => setShowForm(false)}>
//                 <div className="bg-white p-4 rounded shadow-md mx-auto w-1/2 mt-6">
//                     <h2 className="text-xl font-bold mb-4">Customized Report</h2>
//                     <form onSubmit={handleFormSubmit}>
//                         <div className="mb-4">
//                             <label className="font-bold mb-2">Report Type</label>
//                             <Select
//                                 value={reportType}
//                                 onChange={(e) => setReportType(e.target.value)}
//                                 className="w-full"
//                             >
//                                 <MenuItem value="GWP reports">GWP reports</MenuItem>
//                                 <MenuItem value="Other">Other</MenuItem>
//                             </Select>
//                         </div>
//                         <div className="mb-4">
//                             <label className="font-bold mb-2">Transaction Date Period</label>
//                             <div className="flex space-x-2">
//                                 <DatePicker
//                                     selected={startDate}
//                                     onChange={(date) => setStartDate(date)}
//                                     placeholderText="Start Date"
//                                     className="border border-gray-400 rounded px-2 py-1 w-1/2"
//                                 />
//                                 <DatePicker
//                                     selected={endDate}
//                                     onChange={(date) => setEndDate(date)}
//                                     placeholderText="End Date"
//                                     className="border border-gray-400 rounded px-2 py-1 w-1/2"
//                                 />
//                             </div>
//                         </div>
//                         <div className="mb-4">
//                             <label className="font-bold mb-2">Zone</label>
//                             <Select
//                                 value={zone}
//                                 onChange={(e) => setZone(e.target.value)}
//                                 className="w-full"
//                             >
//                                 <MenuItem value="Zone 1">Zone 1</MenuItem>
//                                 <MenuItem value="Zone 2">Zone 2</MenuItem>
//                                 <MenuItem value="Zone 3">Zone 3</MenuItem>
//                             </Select>
//                         </div>
//                         <div className="mb-4">
//                             <label className="font-bold mb-2">Branch</label>
//                             <Select
//                                 value={branch}
//                                 onChange={(e) => setBranch(e.target.value)}
//                                 className="w-full"
//                             >
//                                 <MenuItem value="Branch 1">Branch 1</MenuItem>
//                                 <MenuItem value="Branch 2">Branch 2</MenuItem>
//                                 <MenuItem value="Branch 3">Branch 3</MenuItem>
//                             </Select>
//                         </div>
//                         <Button type="submit">Submit</Button>
//                     </form>
//                 </div>
//             </Modal>
//             <div className="mx-auto mb-4">{renderBreadcrumbs()}</div>
//             <div className="w-1/2 mx-auto text-left">{renderCards()}</div>
//         </div>
//     );
// }

// export default Reports;

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
// import { Icon, MenuItem, Select, Button, Modal } from '@mui/material';
// import DescriptionIcon from '@mui/icons-material/Description';
// import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';

// import Stack from '@mui/material/Stack';
// import CircularProgress from '@mui/material/CircularProgress';

// // export default function CircularColor() {
// //     return (
// //         <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
// //             <CircularProgress color="secondary" />
// //             <CircularProgress color="success" />
// //             <CircularProgress color="inherit" />
// //         </Stack>
// //     );
// // }

// function Reports() {
//     const [directories, setDirectories] = useState({});
//     const [currentPath, setCurrentPath] = useState('');
//     const [breadcrumbs, setBreadcrumbs] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [reportType, setReportType] = useState('');
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [zone, setZone] = useState('');
//     const [branch, setBranch] = useState('');
//     const [generatedReport, setGeneratedReport] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [statusMessage, setStatusMessage] = useState("");


//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const pathParam = searchParams.get('path');

//     useEffect(() => {
//         fetchDirectoryPaths();
//         setCurrentPath(pathParam || '');
//     }, [pathParam]);

//     // const fetchDirectoryPaths = async () => {
//     //     try {
//     //         const response = await fetch('http://127.0.0.1:8000/directories');
//     //         const data = await response.json();
//     //         setDirectories(data);
//     //     } catch (error) {
//     //         console.error('Error fetching directory paths:', error);
//     //     }
//     // };

//     const fetchDirectoryPaths = async () => {
//         try {
//             const response = await fetch('http://127.0.0.1:8000/directories');
//             const data = await response.json();

//             const directories = {};

//             data.forEach((directory) => {
//                 const [id, name, path, type, created, modified, user, status] = directory;
//                 const directoryPath = path.split('/');
//                 console.log(directoryPath)
//                 let currentDirectory = directories;

//                 directoryPath.forEach((pathPart, index) => {
//                     if (!currentDirectory[pathPart]) {
//                         currentDirectory[pathPart] = {};
//                     }

//                     if (index === directoryPath.length - 1) {
//                         currentDirectory[pathPart] = {
//                             name,
//                             type,
//                             created,
//                             modified,
//                             user,
//                             status,
//                         };
//                     }

//                     currentDirectory = currentDirectory[pathPart];
//                 });
//             });

//             setDirectories(directories);
//         } catch (error) {
//             console.error('Error fetching directory paths:', error);
//         }
//     };


//     const handleCardClick = (path) => {
//         setCurrentPath(path);
//         const breadcrumb = [...breadcrumbs, { name: path, path }];
//         setBreadcrumbs(breadcrumb);
//     };

//     const handleBreadcrumbClick = (index) => {
//         const breadcrumb = breadcrumbs.slice(0, index + 1);
//         setCurrentPath(breadcrumb[index].path);
//         setBreadcrumbs(breadcrumb);
//     };

//     const handleFormatChange = (event, path) => {
//         const format = event.target.value;

//         const requestBody = {
//             path: path,
//             format: format,
//         };

//         fetch('http://127.0.0.1:8000/download-file', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(requestBody),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 const base64File = data.file;

//                 const link = document.createElement('a');
//                 link.href = `data:application/octet-stream;base64,${base64File}`;
//                 link.download = `converted_file.${format}`;
//                 link.target = '_blank';

//                 link.click();

//                 link.remove();
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     };
//     const renderCards = () => {
//         const currentDirectory = getDirectoryByPath(currentPath);
//         if (currentDirectory) {
//             console.log(currentDirectory)
//             return Object.keys(currentDirectory).map((name) => {
//                 const item = currentDirectory[name];
//                 const path = currentPath === '' ? name : `${currentPath}/${name}`;
//                 const isFile = typeof item === 'object' && item == null;
//                 console.log(currentPath, item);
//                 if (isFile) {
//                     return (
//                         <div
//                             key={path}
//                             className="bg-white p-4 rounded shadow m-4 text-left flex flex-row"
//                         >
//                             <DescriptionIcon className="text-gray-500 mr-2" />
//                             <h2 className="font-bold mb-2">{name}</h2>
//                             <div className="flex-grow" />
//                             <div className="relative">
//                                 <FormControl sx={{ m: 1, minWidth: 20 }} size="small">
//                                     <Select
//                                         id="demo-select-small"
//                                         value="download"
//                                         onChange={(event) => handleFormatChange(event, path)}
//                                         className="text-gray-600 pl-2"
//                                         IconComponent={GetAppRoundedIcon}
//                                     >
//                                         <MenuItem value="csv">CSV</MenuItem>
//                                         <MenuItem value="xlsx">Excel</MenuItem>
//                                         <MenuItem value="pdf">PDF</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </div>
//                         </div>
//                     );
//                 }

//                 return (
//                     <Link
//                         key={path}
//                         to={`/reports?path=${encodeURIComponent(path)}`}
//                         className="flex flex-row bg-white p-4 rounded shadow-md mx-4 mb-4 block hover:bg-gray-300"
//                     >
//                         <FolderOpenOutlinedIcon />
//                         <h2 className="font-bold mb-2 ml-3">{name}</h2>
//                     </Link>
//                 );
//             });
//         }

//         return null;
//     };


//     const getDirectoryByPath = (path) => {
//         let currentDirectory = directories;

//         if (path) {
//             const pathParts = path.split('/');

//             for (let i = 0; i < pathParts.length; i++) {
//                 const part = pathParts[i];
//                 if (currentDirectory[part]) {
//                     currentDirectory = currentDirectory[part];
//                 } else {
//                     currentDirectory = null;
//                     break;
//                 }
//             }
//         }

//         return currentDirectory;
//     };

//     const renderBreadcrumbs = () => {
//         return (
//             <div className="mx-auto mb-4">
//                 <button className="underline" onClick={() => handleBreadcrumbClick(-1)}>
//                     Home
//                 </button>
//                 {breadcrumbs.map((breadcrumb, index) => (
//                     <React.Fragment key={index}>
//                         <span className="mx-2">{'>'}</span>
//                         <button className="underline" onClick={() => handleBreadcrumbClick(index)}>
//                             {breadcrumb.name}
//                         </button>
//                     </React.Fragment>
//                 ))}
//             </div>
//         );
//     };


//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         setIsLoading(true);
//         setStatusMessage("Report is Generating...");
//         // Call the backend endpoint with the form data
//         const formData = {
//             reportType,
//             startDate,
//             endDate,
//             zone,
//             branch,
//         };
//         setShowForm(false);
//         // Add the new file card to the current directory
//         const updatedDirectories = { ...directories };
//         const newFileName = `GWP-${Date.now()}`;
//         updatedDirectories[currentPath] = {
//             ...updatedDirectories[currentPath],
//             [newFileName]: newFileName,
//         };
//         setDirectories(updatedDirectories);

//         fetch('http://127.0.0.1:8000/generate', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 // Handle the response
//                 if (data.status === 'OK') {
//                     // Update the file card with the download link
//                     updatedDirectories[currentPath][newFileName] = '';
//                     setDirectories(updatedDirectories);
//                     setIsLoading(false);
//                     setStatusMessage('')
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     };


//     const handleCancelForm = () => {
//         setShowForm(false);
//     };

//     const isGWPReportsFolder = currentPath === 'finances/GWP Reports';

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4 pt-4">Reports</h1>
//             {isGWPReportsFolder && (
//                 <Button onClick={() => setShowForm(true)}>
//                     Download Customized Report
//                 </Button>
//             )}
//             <Modal open={showForm} onClose={() => setShowForm(false)}>
//                 <div className="bg-white p-4 rounded shadow-md mx-auto w-1/2 mt-6">
//                     <h2 className="text-xl font-bold mb-4">Customized Report</h2>
//                     <form onSubmit={handleFormSubmit}>
//                         <div className="mb-4">
//                             <label className="font-bold mb-2">Report Type</label>
//                             <Select
//                                 value={reportType}
//                                 onChange={(e) => setReportType(e.target.value)}
//                                 className="w-full"
//                             >
//                                 <MenuItem value="GWP reports">GWP reports</MenuItem>
//                                 <MenuItem value="Other">Other</MenuItem>
//                             </Select>
//                         </div>
//                         <div className="mb-4">
//                             <label className="font-bold mb-2">Transaction Date Period</label>
//                             <div className="flex space-x-2">
//                                 <DatePicker
//                                     selected={startDate}
//                                     onChange={(date) => setStartDate(date)}
//                                     placeholderText="Start Date"
//                                     className="border border-gray-400 rounded px-2 py-1 w-1/2"
//                                 />
//                                 <DatePicker
//                                     selected={endDate}
//                                     onChange={(date) => setEndDate(date)}
//                                     placeholderText="End Date"
//                                     className="border border-gray-400 rounded px-2 py-1 w-1/2"
//                                 />
//                             </div>
//                         </div>
//                         <div className="mb-4">
//                             <label className="font-bold mb-2">Zone</label>
//                             <Select
//                                 value={zone}
//                                 onChange={(e) => setZone(e.target.value)}
//                                 className="w-full"
//                             >
//                                 <MenuItem value="Zone 1">Zone 1</MenuItem>
//                                 <MenuItem value="Zone 2">Zone 2</MenuItem>
//                                 <MenuItem value="Zone 3">Zone 3</MenuItem>
//                             </Select>
//                         </div>
//                         <div className="mb-4">
//                             <label className="font-bold mb-2">Branch</label>
//                             <Select
//                                 value={branch}
//                                 onChange={(e) => setBranch(e.target.value)}
//                                 className="w-full"
//                             >
//                                 <MenuItem value="Branch 1">Branch 1</MenuItem>
//                                 <MenuItem value="Branch 2">Branch 2</MenuItem>
//                                 <MenuItem value="Branch 3">Branch 3</MenuItem>
//                             </Select>
//                         </div>
//                         <Button type="submit">Submit</Button>
//                         <Button onClick={handleCancelForm} >
//                             Cancel
//                         </Button>
//                     </form>
//                 </div>
//             </Modal>
//             {isLoading && statusMessage && (
//                 <div className="w-1/2 mx-auto bg-green-200 p-4 rounded mt-4 flex items-center justify-center">
//                     <CircularProgress size="30px" color="success" className="mr-2" />
//                     <span className="text-green">{statusMessage}</span>
//                 </div>

//             )}
//             <div className="w-1/2 mx-auto text-left">{renderCards()}</div>
//         </div>
//     );
// }

// export default Reports;




import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { Icon, MenuItem, Select, Button, Modal } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

// export default function CircularColor() {
//     return (
//         <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
//             <CircularProgress color="secondary" />
//             <CircularProgress color="success" />
//             <CircularProgress color="inherit" />
//         </Stack>
//     );
// }

function Reports() {
    const [directories, setDirectories] = useState({});
    const [currentPath, setCurrentPath] = useState('');
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [reportType, setReportType] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [zone, setZone] = useState('');
    const [branch, setBranch] = useState('');
    const [generatedReport, setGeneratedReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pathParam = searchParams.get('path');

    useEffect(() => {
        fetchDirectoryPaths();
        setCurrentPath(pathParam || '');
    }, [pathParam]);

    // const fetchDirectoryPaths = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/directories');
    //         const data = await response.json();
    //         setDirectories(data);
    //     } catch (error) {
    //         console.error('Error fetching directory paths:', error);
    //     }
    // };

    const fetchDirectoryPaths = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/directories');
            const data = await response.json();

            const directories = {};

            data.forEach((directory) => {
                const [id, name, path, type, created, modified, user, status] = directory;
                const directoryPath = path.split('/');
                console.log(directoryPath)
                let currentDirectory = directories;

                directoryPath.forEach((pathPart, index) => {
                    if (!currentDirectory[pathPart]) {
                        currentDirectory[pathPart] = {};
                    }

                    if (index === directoryPath.length - 1) {
                        currentDirectory[pathPart] = {
                            name,
                            type,
                            created,
                            modified,
                            user,
                            status,
                        };
                    }

                    currentDirectory = currentDirectory[pathPart];
                });
            });

            setDirectories(directories);
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

    const handleFormatChange = (event, path) => {
        const format = event.target.value;

        const requestBody = {
            path: path,
            format: format,
        };

        fetch('http://127.0.0.1:8000/download-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                const base64File = data.file;

                const link = document.createElement('a');
                link.href = `data:application/octet-stream;base64,${base64File}`;
                link.download = `converted_file.${format}`;
                link.target = '_blank';

                link.click();

                link.remove();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const renderCards = () => {
        const currentDirectory = getDirectoryByPath(currentPath);
        if (currentDirectory) {
            console.log(currentDirectory)
            return Object.keys(currentDirectory).map((name) => {
                const item = currentDirectory[name];
                const path = currentPath === '' ? name : `${currentPath}/${name}`;
                const isFile = typeof item === 'object' && item !== null && item.type === 'file'; // Check if it is a file
                const isFolder = typeof item === 'object' && item !== null && item.type === 'folder'; // Check if it is a folder

                console.log(currentPath, item);
                if (isFile) {
                    const generatedBy = `Generated by ${item.user} at ${item.modified}`;
                    return (
                        <div key={path} className="bg-white p-4 rounded shadow m-4 text-left flex flex-row">
                            <div className="flex items-center">
                                <DescriptionIcon className="text-gray-500 mr-2" />
                                <div>
                                    <h2 className="font-bold mb-1">{name}</h2>
                                    {item.status === 'generated' ? (
                                        <span className="text-gray-500">{generatedBy}</span>
                                    ) : (
                                        <span className="text-gray-500">File is generating...</span>
                                    )}
                                </div>
                            </div>
                            <div className="ml-auto flex items-center">
                                {item.status === 'generated' && (
                                    <>
                                        <div className="relative">
                                            <FormControl sx={{ m: 1, minWidth: 20 }} size="small">
                                                <Select
                                                    id="demo-select-small"
                                                    value="download"
                                                    onChange={(event) => handleFormatChange(event, path)}
                                                    className="text-gray-600 pl-2"
                                                    IconComponent={GetAppRoundedIcon}
                                                >
                                                    <MenuItem value="csv">CSV</MenuItem>
                                                    <MenuItem value="xlsx">Excel</MenuItem>
                                                    <MenuItem value="pdf">PDF</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                    );

                }
                if (isFolder) {
                    return (
                        <Link
                            key={path}
                            to={`/reports?path=${encodeURIComponent(path)}`}
                            className="flex flex-row bg-white p-4 rounded shadow-md mx-4 mb-4 block hover:bg-gray-300"
                        >
                            <FolderOpenOutlinedIcon />
                            <h2 className="font-bold mb-2 ml-3">{name}</h2>
                        </Link>
                    );
                }
                return null;
            });
        }

        return null;
    };

    const renderTable = () => {
        const currentDirectory = getDirectoryByPath(currentPath);
        if (currentDirectory) {
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Name</TableCell>
                                {/* <TableCell>Type</TableCell> */}
                                {/* <TableCell>Created</TableCell> */}
                                {/* <TableCell>Modified</TableCell> */}
                                <TableCell>User</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(currentDirectory).map((name) => {
                                const item = currentDirectory[name];
                                const path = currentPath === '' ? name : `${currentPath}/${name}`;
                                const isFile = typeof item === 'object' && item !== null && item.type === 'file'; // Check if it is a file
                                const isFolder = typeof item === 'object' && item !== null && item.type === 'folder'; // Check if it is a folder

                                const dateTime = new Date(item.modified);

                                const formattedDateTime = dateTime.toLocaleString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                });

                                console.log(formattedDateTime);
                                if (isFile) {
                                    const generatedBy = `Generated by ${item.user} at ${formattedDateTime}`;
                                    return (
                                        <TableRow key={path}>
                                            <TableCell><DescriptionIcon className="text-gray-500 mr-2" /></TableCell>
                                            <TableCell>

                                                {name}
                                            </TableCell>
                                            {/* <TableCell>File</TableCell> */}
                                            {/* <TableCell>{item.created}</TableCell> */}
                                            {/* <TableCell>{formattedDateTime}</TableCell> */}
                                            <TableCell>{item.user}</TableCell>
                                            <TableCell>
                                                {item.status === 'generated' ? (
                                                    generatedBy
                                                ) : (
                                                    <span className="text-gray-500">File is generating...</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {item.status === 'generated' && (
                                                    <FormControl sx={{ m: 1, minWidth: 20 }} size="small">
                                                        <Select
                                                            id="demo-select-small"
                                                            value="download"
                                                            onChange={(event) => handleFormatChange(event, path)}
                                                            className="text-gray-600 pl-2"
                                                            IconComponent={GetAppRoundedIcon}
                                                        >
                                                            <MenuItem value="csv">CSV</MenuItem>
                                                            <MenuItem value="xlsx">Excel</MenuItem>
                                                            <MenuItem value="pdf">PDF</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }

                                if (isFolder) {
                                    return (
                                        <TableRow
                                            hover
                                            sx={{ cursor: 'pointer' }}
                                            key={path}>
                                            <TableCell>
                                                <FolderOpenOutlinedIcon />

                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    key={path}
                                                    to={`/reports?path=${encodeURIComponent(path)}`}
                                                    className="flex flex-row block "
                                                >
                                                    {/* <FolderOpenOutlinedIcon /> */}
                                                    <h2 className="font-bold mb-2 ml-3">{name}</h2>
                                                </Link>
                                            </TableCell>
                                            {/* <TableCell>Folder</TableCell> */}
                                            {/* <TableCell>{item.created}</TableCell> */}
                                            {/* <TableCell>{formattedDateTime}</TableCell> */}
                                            <TableCell>{item.user}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    );
                                }

                                return null;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
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
        return (
            <div className="mx-auto mb-4">
                <button className="underline" onClick={() => handleBreadcrumbClick(-1)}>
                    Home
                </button>
                {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={index}>
                        <span className="mx-2">{'>'}</span>
                        <button className="underline" onClick={() => handleBreadcrumbClick(index)}>
                            {breadcrumb.name}
                        </button>
                    </React.Fragment>
                ))}
            </div>
        );
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Call the backend endpoint with the form data
        const formData = {
            file_name: reportType,
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
            // zone,
            // branch,
        };
        console.log(formData)
        setShowForm(false);

        fetch('http://127.0.0.1:8000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(() => { window.location.reload(); })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response
                if (data.status === 'OK') {

                    // Update the file card with the download link
                    // updatedDirectories[currentPath][newFileName] = '';
                    // setDirectories(updatedDirectories);
                    setIsLoading(false);
                    setStatusMessage('')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const handleCancelForm = () => {
        setShowForm(false);
    };

    const isGWPReportsFolder = currentPath === 'finances/GWP Reports';

    return (
        <div
            style={{ width: '70vw' }}
            className="mx-auto mt-2 text-left">
            <h1 className="text-2xl font-bold mb-4 pt-4 ">Reports</h1>
            <div className='flex flex-row-reverse mb-2'>
                {isGWPReportsFolder && (
                    <Button onClick={() => setShowForm(true)}>
                        Download Customized Report
                    </Button>
                )}
            </div>

            <Modal open={showForm} onClose={() => setShowForm(false)}>
                <div className="bg-white p-4 rounded shadow-md mx-auto w-1/2 mt-6">
                    <h2 className="text-xl font-bold mb-4">Customized Report</h2>
                    <form onSubmit={handleFormSubmit}>
                        {/* <div className="mb-4">
                            <label className="font-bold mb-2">Report Type</label>
                            <Select
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                className="w-full"
                            >
                                <MenuItem value="GWP reports">GWP reports</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </div> */}
                        <div className="mb-4">
                            <label className="font-bold mb-2">Report Name</label>
                            <input
                                type="text"
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                className="w-full border border-gray-400 rounded outline-none px-3 py-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="font-bold mb-2">Transaction Date Period</label>
                            <div className="flex space-x-2">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    placeholderText="Start Date"
                                    className="border border-gray-400 rounded px-2 py-1 w-1/2"
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    placeholderText="End Date"
                                    className="border border-gray-400 rounded px-2 py-1 w-1/2"
                                />
                            </div>
                        </div>
                        {/* <div className="mb-4">
                            <label className="font-bold mb-2">Zone</label>
                            <Select
                                value={zone}
                                onChange={(e) => setZone(e.target.value)}
                                className="w-full"
                            >
                                <MenuItem value="Zone 1">Zone 1</MenuItem>
                                <MenuItem value="Zone 2">Zone 2</MenuItem>
                                <MenuItem value="Zone 3">Zone 3</MenuItem>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <label className="font-bold mb-2">Branch</label>
                            <Select
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                className="w-full"
                            >
                                <MenuItem value="1">Chilaw</MenuItem>
                                <MenuItem value="2">Dambulla</MenuItem>
                                <MenuItem value="3">Kuliyapitiya</MenuItem>
                                </Select>
                        </div> */}
                        <Button type="submit">Submit</Button>
                        <Button onClick={handleCancelForm} >
                            Cancel
                        </Button>
                    </form>
                </div>
            </Modal>
            {isLoading && statusMessage && (
                <div className="w-1/2 mx-auto bg-green-200 p-4 rounded mt-4 flex items-center justify-center">
                    <CircularProgress size="30px" color="success" className="mr-2" />
                    <span className="text-green">{statusMessage}</span>
                </div>

            )}
            <div
                style={{ width: '70vw' }}
                className="mx-auto text-left">{renderTable()}</div>
        </div>
    );
}

export default Reports;
