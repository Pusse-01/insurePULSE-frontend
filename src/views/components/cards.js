import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LoopIcon from '@mui/icons-material/Loop';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Cards = () => {
    const [vals, setVals] = useState({});
    const [isDataLoaded, setDataLoaded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setDataLoaded(false)
                const response = await fetch('http://127.0.0.1:8000/monthly_counts');
                const data = await response.json();
                setVals(data);
                setDataLoaded(true)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex justify-center mt-8">
            <Card className="w-64 m-4">
                <CardContent className="flex flex-col items-start">
                    <div className="flex  items-center mt-4">
                        <BusinessCenterIcon className="mr-2" color="primary" />
                        <Typography variant="p" component="p">
                            New Business Count
                        </Typography>
                    </div>

                    {!isDataLoaded ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress className="m-4" size={30} />
                        </Box>
                    ) : (
                        <Typography variant="h5" component="p" className="ml-2 mt-2" color="text.secondary">
                            {vals.New_Business}

                        </Typography>)}

                </CardContent>
            </Card>
            <Card className="w-64 m-4">
                <CardContent className="flex flex-col items-start">
                    <div className="flex  items-center mt-4">
                        <LoopIcon className="mr-2" color="primary" />
                        <Typography variant="p" component="p">
                            Renewal Count
                        </Typography>
                    </div>
                    {!isDataLoaded ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress className="m-4" size={30} />
                        </Box>
                    ) : (
                        <Typography variant="h5" component="p" className="ml-2 mt-2" color="text.secondary">
                            {vals.Renewal}

                        </Typography>)}
                </CardContent>
            </Card>
            <Card className="w-64 m-4">
                <CardContent className="flex flex-col items-start">
                    <div className="flex  items-center mt-4">
                        <CancelRoundedIcon className="mr-2" color="primary" />
                        <Typography variant="p" component="p">
                            Cancellations
                        </Typography>
                    </div>
                    {!isDataLoaded ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress className="m-4" size={30} />
                        </Box>
                    ) : (
                        <Typography variant="h5" component="p" className="ml-2 mt-2" color="text.secondary">
                            {vals.Cancellation}

                        </Typography>)}
                </CardContent>
            </Card>
            <Card className="w-64 m-4">
                <CardContent className="flex flex-col items-start">
                    <div className="flex  items-center mt-4">
                        <WorkspacePremiumRoundedIcon className="mr-2" color="primary" />
                        <Typography variant="p" component="p">
                            Endorsements
                        </Typography>
                    </div>
                    {!isDataLoaded ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress className="m-4" size={30} />
                        </Box>
                    ) : (
                        <Typography variant="h5" component="p" className="ml-2 mt-2" color="text.secondary">
                            {vals.Endorsement}

                        </Typography>)}
                </CardContent>
            </Card>
        </div>
    );
};

export default Cards;
