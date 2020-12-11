import React, { Component,useParams } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints = [];
const getSensor_name= ()=>{
  let url = window.location.href;
  var sensor = url.split('/')[4];

  console.log(sensor);
  return sensor;
}
class Sensor extends Component {
  constructor(props) {
    super(props);
     
    console.log(`props`+props);
  }
	render() {
		const options = {
			animationEnabled: true,
			title:{
				text: "Monthly Sales - 2017"
			},
			axisX: {
				valueFormatString: "MMM"
			},
			axisY: {
				title: "Sales (in USD)",
				prefix: "$",
				includeZero: false
			},
			data: [{
				yValueFormatString: "$#,###",
				xValueFormatString: "MMMM",
				type: "spline",
				dataPoints:dataPoints
			}]
		}
		
		return (
		<div>
			<h1>React Spline Chart</h1>
			<CanvasJSChart options = {options} 
			 onRef={ref => this.chart = ref} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
  }

  componentDidMount(){
    var chart = this.chart;
      const sensor_name_data =  getSensor_name();
      const data = { sensor_name: sensor_name_data };
    fetch('/access_temperature',{
      method:'post',
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          sensor_name : data
      })
  }).then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints.push({
					x: new Date(data[i].time),
					y: data[i].temperature
				});
			}
      console.log(dataPoints);
      chart.render();
		});
	}
}

export default Sensor;                           