"use client";

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface RadarChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string;
            borderColor: string;
            borderWidth: number;
        }[];
    };
}

export default function RadarChart({ data }: RadarChartProps) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)",
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20,
                    backdropColor: "transparent",
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
                pointLabels: {
                    font: {
                        size: 12,
                        family: "var(--font-inter)",
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return <Radar data={data} options={options} />;
}
