import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

import { Line } from "react-chartjs-2";

const options = {
	plugins: {
		legend: {
			display: false,
		},
	},
	elements: {
		line: {
			tension: 0,
			borderWidth: 2,
			borderColor: "#7C3AED",
			fill: "start",
			backgroundColor: "rgba(0,0,0,0)",
		},
		point: {
			radius: 8,
			hitRadius: 10,
		},
	},
	lineHeightAnnotation: {
		always: true,
		lineWeight: 1.5,
	},
	animation: {
		duration: 1,
	},
	maintainAspectRatio: true,
	responsive: true,
	scales: {
		xAxis: { display: false },
		yAxis: { display: true },
	},
};

const PriceChart = ({ ticker }) => {
	const formatData = () => {
		return ticker
			.sort((a, b) => {
				return new Date(a.last_traded_at) < new Date(b.last_traded_at);
			})
			.map((price) => {
				return {
					x: new Date(price.last_traded_at).toLocaleString(),
					y: price.converted_last.usd,
				};
			});
	};

	const data = {
		datasets: [{ data: formatData(ticker) }],
	};

	return <Line data={data} width="400" height="160" options={options} className="my-16" />;
};

export default PriceChart;
