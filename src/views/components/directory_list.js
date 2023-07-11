import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem, Select, Button, Modal, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import { Table, Container, Avatar, TableBody, TableCell, TableContainer, TableRow, IconButton, Card } from '@mui/material';
import USERLIST from '../../_mock/user';
import Label from '../components/label';
import Iconify from '../components/iconify';
import { UserListHead } from '../components/user';
import { filter } from 'lodash';
import FolderIcon from '@mui/icons-material/Folder';
import { green } from '@mui/material/colors';
import AssessmentIcon from '@mui/icons-material/Assessment';

// import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function Reports() {
    const [directories, setDirectories] = useState({});
    const [currentPath, setCurrentPath] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [reportType, setReportType] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // const [zone, setZone] = useState('');
    // const [branch, setBranch] = useState('');
    // const [generatedReport, setGeneratedReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false)


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pathParam = searchParams.get('path');

    useEffect(() => {
        fetchDirectoryPaths();
        setCurrentPath(pathParam || '');
    }, [pathParam]);

    const fetchDirectoryPaths = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://20.65.116.20/directories');
            const data = await response.json();

            const directories = {};

            data.forEach((directory) => {
                const [id, name, path, type, created, modified, user, status] = directory;

                const directoryPath = path.split('/');

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
            setLoading(false)
        } catch (error) {
            console.error('Error fetching directory paths:', error);
            setLoading(false)
        }
    };



    const handleFormatChange = (event, path) => {
        setLoading(true)
        const format = event.target.value;

        const requestBody = {
            path: path,
            format: format,
        };

        fetch('http://20.65.116.20/download-file', {
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
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.error('Error:', error);
            });
    };
    // const renderCards = () => {
    //     const currentDirectory = getDirectoryByPath(currentPath);
    //     if (currentDirectory) {
    //         console.log(currentDirectory)
    //         return Object.keys(currentDirectory).map((name) => {
    //             const item = currentDirectory[name];
    //             const path = currentPath === '' ? name : `${currentPath}/${name}`;
    //             const isFile = typeof item === 'object' && item !== null && item.type === 'file'; // Check if it is a file
    //             const isFolder = typeof item === 'object' && item !== null && item.type === 'folder'; // Check if it is a folder

    //             console.log(currentPath, item);
    //             if (isFile) {
    //                 const generatedBy = `Generated by ${item.user} at ${item.modified}`;
    //                 return (
    //                     <div key={path} className="bg-white p-4 rounded shadow m-4 text-left flex flex-row">
    //                         <div className="flex items-center">
    //                             <DescriptionIcon className="text-gray-500 mr-2" />
    //                             <div>
    //                                 <h2 className="font-bold mb-1">{name}</h2>
    //                                 {item.status === 'generated' ? (
    //                                     <span className="text-gray-500">{generatedBy}</span>
    //                                 ) : (
    //                                     <span className="text-gray-500">File is generating...</span>
    //                                 )}
    //                             </div>
    //                         </div>
    //                         <div className="ml-auto flex items-center">
    //                             {item.status === 'generated' && (
    //                                 <>
    //                                     <div className="relative">
    //                                         <FormControl sx={{ m: 1, minWidth: 20 }} size="small">
    //                                             <Select
    //                                                 id="demo-select-small"
    //                                                 value="download"
    //                                                 onChange={(event) => handleFormatChange(event, path)}
    //                                                 className="text-gray-600 pl-2"
    //                                                 IconComponent={GetAppRoundedIcon}
    //                                             >
    //                                                 <MenuItem value="csv">CSV</MenuItem>
    //                                                 <MenuItem value="xlsx">Excel</MenuItem>
    //                                                 <MenuItem value="pdf">PDF</MenuItem>
    //                                             </Select>
    //                                         </FormControl>
    //                                     </div>

    //                                 </>
    //                             )}
    //                         </div>
    //                     </div>
    //                 );

    //             }
    //             if (isFolder) {
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
    //             }
    //             return null;
    //         });
    //     }

    //     return null;
    // };
    const TABLE_HEAD = [
        { id: 'name', label: 'Name', alignCenter: true },
        { id: 'company', label: 'User', alignRight: false },
        { id: 'role', label: 'Status', alignRight: false },
        { id: 'isVerified', label: 'Action', alignRight: false },
        { id: '' },
    ];

    // ----------------------------------------------------------------------

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function applySortFilter(array, comparator, query) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        if (query) {
            return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        }
        return stabilizedThis.map((el) => el[0]);
    }


    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    const renderTable = () => {
        const currentDirectory = getDirectoryByPath(currentPath);
        if (currentDirectory) {
            const sortedItems = Object.keys(currentDirectory)
                .map((name) => ({
                    name,
                    item: currentDirectory[name]
                }))
                .sort((a, b) => new Date(b.item.modified) - new Date(a.item.modified)); // Sort items in descending order based on modified date

            return (
                <>
                    <Container sx={{ overflowY: 'hidden' }}>
                        <Card >
                            <TableContainer sx={{ minWidth: 800, }}>
                                <Table>
                                    <UserListHead
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={USERLIST.length}
                                        numSelected={selected.length}
                                        onRequestSort={handleRequestSort}
                                        onSelectAllClick={handleSelectAllClick}
                                    />
                                    <TableBody>
                                        {loading &&
                                            <div style={styles.overlayBox}>
                                                <CircularProgress className="ml-20" sx={{ zIndex: 9999 }} size={40} />
                                            </div>
                                        }
                                        {sortedItems.map(({ name, item }) => {
                                            const path = currentPath === '' ? name : `${currentPath}/${name}`;
                                            const isFile = typeof item === 'object' && item !== null && item.type === 'file'; // Check if it is a file
                                            const isFolder = typeof item === 'object' && item !== null && item.type === 'folder'; // Check if it is a folder

                                            const dateTime = new Date(item.modified);

                                            const formattedDateTime = dateTime.toLocaleString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric',
                                            });
                                            if (isFile) {
                                                const generatedBy = `Generated by ${item.user} at ${formattedDateTime}`;
                                                return (
                                                    <TableRow hover key={path} tabIndex={-1} role="checkbox" >
                                                        <TableCell padding="">
                                                            <Avatar sx={{ width: 30, height: 30, bgcolor: green[500], zIndex: 100 }}>
                                                                <AssessmentIcon sx={{ width: 20, height: 20, }} />
                                                            </Avatar>                                                        </TableCell>

                                                        <TableCell component="th" scope="row" padding="none">
                                                            {name}
                                                        </TableCell>

                                                        <TableCell align="left">{item.user}</TableCell>

                                                        <TableCell align={item.status !== 'generated' ? 'center' : 'left'}>
                                                            {item.status === 'generated' ? (
                                                                generatedBy
                                                            ) : (
                                                                <CircularProgress size={20} />
                                                            )}
                                                        </TableCell>

                                                        {/* <TableCell align="left">
                                                                {item.status === 'generated' && (
                                                                    <FormControl sx={{ m: 1, minWidth: 20, }} className='text-center' size="small">
                                                                        <Select
                                                                            id="demo-select-small"
                                                                            displayEmpty
                                                                            value="download"
                                                                            renderValue={(value) => {
                                                                                return (
                                                                                    <Box sx={{ display: "flex", gap: 1 }}>
                                                                                        <SvgIcon color="primary">
                                                                                            <GetAppRoundedIcon />
                                                                                        </SvgIcon>
                                                                                    </Box>
                                                                                );
                                                                            }}

                                                                            onChange={(event) => handleFormatChange(event, path)}
                                                                            className="text-gray-600 p-0 flex justify-center content-center"
                                                                        // IconComponent={GetAppRoundedIcon}
                                                                        >
                                                                            <MenuItem value="csv">CSV</MenuItem>
                                                                            <MenuItem value="xlsx">Excel</MenuItem>
                                                                            <MenuItem value="pdf">PDF</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                )}
                                                            </TableCell> */}
                                                        <TableCell align="right">
                                                            <IconButton size="small" sx={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }} color="inherit" >
                                                                {item.status === 'generated' && (
                                                                    <FormControl sx={{ m: 1, minWidth: 20, }} className='text-center' size="small">
                                                                        <Select
                                                                            id="demo-select-small"
                                                                            displayEmpty
                                                                            sx={{ '& > fieldset': { border: 'none' } }}
                                                                            style={{}}
                                                                            value="download"
                                                                            inputProps={{ IconComponent: () => null }}
                                                                            renderValue={(value) => {
                                                                                return (
                                                                                    <Iconify icon={'eva:download-fill'} />
                                                                                );
                                                                            }}

                                                                            onChange={(event) => handleFormatChange(event, path)}
                                                                            className="text-gray-600 p-0 flex justify-center content-center"
                                                                        // IconComponent={GetAppRoundedIcon}
                                                                        >
                                                                            <MenuItem value="csv">
                                                                                <Iconify icon={'eva:file-fill'} sx={{ mr: 2 }} />
                                                                                CSV
                                                                            </MenuItem>
                                                                            <MenuItem value="xlsx">
                                                                                <Iconify icon={'eva:file-fill'} sx={{ mr: 2 }} />
                                                                                Excel
                                                                            </MenuItem>
                                                                            <MenuItem value="pdf">
                                                                                <Iconify icon={'eva:file-fill'} sx={{ mr: 2 }} />
                                                                                PDF
                                                                            </MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                )}
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Label color={(item.status !== 'generated' && 'error') || 'success'}>{item.status}</Label>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }
                                            if (isFolder) {
                                                return (
                                                    <TableRow hover key={path} tabIndex={-1} role="checkbox" >
                                                        <TableCell padding="">
                                                            <Avatar sx={{ width: 30, height: 30, bgcolor: '#2065D1', zIndex: 100 }}>
                                                                <FolderIcon sx={{ width: 20, height: 20 }} />
                                                            </Avatar>
                                                        </TableCell>
                                                        <TableCell align="left" component="th" scope="row" padding="none">
                                                            <Link
                                                                key={path}
                                                                to={`/reports?path=${encodeURIComponent(path)}`}
                                                                className="flex flex-row block  w-100%"
                                                            >
                                                                <Typography className="font-sans font-medium w-full pl-2">{name}</Typography>
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell align="left" component="th" scope="row" >
                                                            <Typography className='font-sans font-medium' noWrap>
                                                                {item.user}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell component="th" scope="row" >

                                                        </TableCell>
                                                        <TableCell component="th" scope="row" padding="none">

                                                        </TableCell>
                                                        <TableCell component="th" scope="row" padding="none">

                                                        </TableCell>
                                                        <TableCell component="th" scope="row" padding="none">

                                                        </TableCell>
                                                        <TableCell component="th" scope="row" padding="none">

                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }

                                            return null;

                                        })}
                                        {/* {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )} */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Container>


                </>
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

        fetch('http://20.65.116.20/generate', {
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

let styles = {
    tableHeaderCells: {
        backgroundColor: '#FAFAFA',
        color: '#202125',
        borderColor: '#F0F0F0',
        borderRightWidth: 1.7,
        padding: 5,
        textAlign: 'center'
    },
    tableCellBorder: {
        borderColor: '#F0F0F0',
        borderRightWidth: 1.7,
        textAlign: 'center',
        padding: 10
    },
    overlayBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        backgroundColor: '#F0F0F0',
        opacity: .8,
        width: '100%',
        height: '150%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default Reports;
