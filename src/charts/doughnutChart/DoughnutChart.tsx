"use client"
import React from 'react'

import {Doughnut} from "react-chartjs-2"
import {Chart as ChartJs, ArcElement, Tooltip, Title} from "chart.js"

ChartJs.register(ArcElement, Tooltip)

const DoughnutChart = () => {
  return (
    <Doughnut data={{
        labels: [
          'D1',
          'D2',
      
        ],
        datasets: [{
          label: 'Dataset',
          data: [2040, 3000],
          backgroundColor: [
              'rgb(221, 198, 255)',
              'rgb(255, 255, 255)',
         
          ],
          hoverOffset: 4,
          rotation: -24,
          borderColor:"transparent",
          

          
        }],
        
      }

    }/>
  )
}

export default DoughnutChart
