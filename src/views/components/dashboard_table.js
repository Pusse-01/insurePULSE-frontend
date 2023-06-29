import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DenseTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the endpoint
        fetch('http://127.0.0.1:8000/chanel_data')
            .then((response) => response.json())
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
            <TableContainer component={Paper} className="mt-4">
                <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Channel</TableCell>
                            <TableCell align="right">Department</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.chanel}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.chanel}
                                </TableCell>
                                <TableCell align="right">{row.department}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}