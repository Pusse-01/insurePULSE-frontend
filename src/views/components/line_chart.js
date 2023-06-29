import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'area',
            stacked: false,
            height: 650,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0
        },
        title: {
            text: 'Total GWP',
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return (val).toFixed(2);
                }
            },
            title: {
                text: 'Count'
            }
        },
        xaxis: {
            type: 'datetime'
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return (val).toFixed(2);
                }
            }
        }
    });
    const [chartSeries, setChartSeries] = useState([]);

    useEffect(() => {
        // Fetch data from backend API
        fetch('http://127.0.0.1:8000/gwp_counts')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const formattedData = data.map(item => ({
                    x: new Date(item[0]),
                    y: item[1]
                }));

                setChartSeries([{ data: formattedData }]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div id="chart" className='mt-4'>
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={350}
            />
        </div>
    );
};

export default LineChart;
