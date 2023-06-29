import React from 'react'
import Cards from '../../components/cards'
import LineChart from '../../components/line_chart'
import DenseTable from '../../components/dashboard_table'
import Box from '@mui/material/Box';
import PieChart from '../../components/pie_chart';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Iconify from '../../components/iconify';
import AppWidgetSummary from '../../components/AppWidgetSummary';

function Home() {
    return (
        <div style={{ width: '70vw' }} className="mx-auto mt-2 text-left">
            <Cards />
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 8">
                    <LineChart />
                </Box>
                <Box gridColumn="span 4">
                    <PieChart />
                </Box>
            </Box>
        </div>
    );
}

export default Home
