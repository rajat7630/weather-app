import React, { Component } from 'react';
import Chart from 'chart.js';
import AlertCards from './alertsCard';
class WeatherGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hourlyWeatherStatus: [],
            alerts: [{
                "sender_name": "NWS Tulsa (Eastern Oklahoma)",
                "event": "Heat Advisory",
                "start": 1597341600,
                "end": 1597366800,
                "description": "...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible."
            }]
        }
        this.chartRef = React.createRef();
        this.getDate = this.getDate.bind(this);
        this.addZero = this.addZero.bind(this);
    }

    addZero = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    getDate = (sec) => {
        let d = new Date(sec * 1000);
        let h = this.addZero(d.getHours());
        return h+':00';

    }
    componentDidMount() {
        let currLocation = (pos) => {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=eb9219860969f10dd7bfc2d91212ad98`)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        hourlyWeatherStatus: [...data.hourly].slice(0, 24),
                    })
                    if (data.alerts) {
                        this.setState({
                            alerts: [...data.alerts],
                        })
                    }
                    console.log(data)
                    this.barGraph = new Chart(this.chartRef.current, {
                        type: 'bar',
                        data: {
                            labels: this.state.hourlyWeatherStatus.map(temp => { return this.getDate(temp.dt) }),
                            datasets: [{
                                label: ' ˚C',
                                data: this.state.hourlyWeatherStatus.map(temp => { return (temp.temp - 273).toFixed(1) }),
                                borderWidth: 3,
                                barThickness: 20,
                                backgroundColor: '#2798ED',
                            }]
                        },
                        options: {
                            legend: {
                                labels: {
                                    fontColor: 'black',
                                    defaultFontSize: 50,
                                }
                            }
                        }
                    })
                });
        }
        navigator.geolocation.getCurrentPosition(currLocation);


    }

    render() {
        let alerts = [];
        if (this.state.alerts) {

            this.state.alerts.forEach(alert => {
                alerts.push(<AlertCards alert={alert} />)
            })
        }
        let ctx = (this.state.hourlyWeatherStatus !== undefined) ? <canvas ref={this.chartRef} className="canvas max-w-6xl mx-auto" /> : null;
        return (
            <>
                <div>

                    <div className="text-blue-900 text-4xl my-8 mt-14 font-bold">Current Temperature</div>
                    {ctx}
                </div>
                <div className="border-red-800 border-2 rounded-xl mb-32  bg-red-300 max-w-6xl mx-auto  mt-6">
                    <span className="text-red-900 text-4xl my-8 font-bold">Alerts</span>
                    <div className="mx-auto max-w-6xl">
                        {alerts}
                    </div>
                </div>
            </>
        )
    }
}

export default WeatherGraph;