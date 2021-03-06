import React from 'react';
import Chart from 'chart.js';
import { Expressions } from './chartData';

class StageExpressionChart extends React.Component {
	componentDidMount() {
		const { chartData } = this.props;
		if (!chartData) return;
		this.chart = new Chart(this.graph, {
			type: 'horizontalBar',
			data: {
				labels: chartData.stageNames,
				datasets: [
					{
						label: [],
						data: chartData.expressionTypes,
						backgroundColor: chartData.colors,
						borderWidth: 1
					}
				]
			},
			options: {
				title: {
					text: 'Expression by Stage',
					display: true,
					fontSize: 18,
					position: 'top',
					fontStyle: 'bold',
					fontColor: '#000'
				},
				legend: {
					position: 'top',
					labels: {
						generateLabels() {
							// get labels from Expressions Object already made in `chartData.js`
							const labels = Object.keys(Expressions).map(key => {
								return {
									text: `${key}: ${Expressions[key].range}`,
									fillStyle: Expressions[key].color,
									strokeStyle: Expressions[key].color,
									lineWidth: 1,
									hidden: false,
									index: 0
								};
							});
							labels.shift();
							return labels;
						}
					},
					// override the chartjs defualt click function
					onClick() {}
				},
				tooltips: {
					callbacks: {
						label(tooltipItem) {
							return chartData.hoverTexts[tooltipItem.index];
						}
					},
					backgroundColor: '#ffffff',
					bodyFontColor: '#000000',
					titleFontColor: '#000000',
					titleFontSize: 16,
					bodyFontSize: 14,
					borderColor: '#dadada',
					borderWidth: 1
				},
				scales: {
					yAxes: [
						{
							scaleLabel: {
								display: true,
								labelString: 'Stage',
								fontSize: 16,
								fontStyle: 'italic',
								fontColor: '#000'
							}
						}
					],
					xAxes: [
						{
							ticks: { stepSize: 3, beginAtZero: true, display: false }
						}
					]
				},
				maintainAspectRatio: true,
				responsive: true
			}
		});
	}

	render() {
		return (
			<canvas
				height={440}
				ref={r => {
					this.graph = r;
				}}
			/>
		);
	}
}

export default StageExpressionChart;
