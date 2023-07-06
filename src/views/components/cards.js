import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import AppWidgetSummary from './AppWidgetSummary';

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
        <div className="flex justify-center mt-8 mb-10">
            {/* <Card className="w-64 m-4">
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
            </Card> */}
        <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Business Count" total= {vals.New_Business} icon={'mdi:business'} isDataLoaded={isDataLoaded}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Renewal Count" total={vals.Renewal} color="info" icon={'mdi:sync'} isDataLoaded={isDataLoaded}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Cancellations" total={vals.Cancellation} color="warning" icon={'mdi:cancel'} isDataLoaded={isDataLoaded}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Endorsements" total={vals.Endorsement} color="error" icon={'mdi:office-building'} isDataLoaded={isDataLoaded}/>
          </Grid>
        </Grid>
      </Container>

        </div>
    );
};

export default Cards;
