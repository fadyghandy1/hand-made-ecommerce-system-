import React from 'react';
import { Line } from 'react-chartjs-2';
import './ChartData.css'

const data = {
  labels: ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th','Fr'],
  datasets: [
    {
      label: '# of Votes',
      data: [244, 321, 123, 35, 412, 234],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
}; 

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const ChartData = () => (
  <><div className="chartContiner">
    <div className='header'>
      <h1 className='title'>Last Weak New Users</h1>
      <div className='links'>
 
      </div>
    </div>
    <Line data={data} options={options} />
    </div>
  </>
);

export default ChartData;