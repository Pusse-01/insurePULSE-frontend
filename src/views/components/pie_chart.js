import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/piechart_data');
                const data = await response.json();
                setChartData(data);
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const series = chartData.map((item) => item.Gross_Premium);
    const labels = chartData.map((item) => item.Channel);

    const options = {
        chart: {
            width: '100%',
            type: 'pie',
        },
        labels: labels,
        theme: {
            monochrome: {
                enabled: true,
            },
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5,
                },
            },
        },
        title: {
            text: 'GWP x Chanels',
        },
        dataLabels: {
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex];
                return [name, val.toFixed(5) + '%'];
            },
        },
        legend: {
            show: false,
        },
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="pie" />
        </div>
    );
};

export default PieChart;
