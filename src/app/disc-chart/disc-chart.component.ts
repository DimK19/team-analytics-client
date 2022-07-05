import { Component, OnInit, Input } from '@angular/core';
import { Chart, PieController, ArcElement, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
    selector: 'DiscChartComponent',
    templateUrl: './disc-chart.component.html',
    styleUrls: ['./disc-chart.component.css']
})
export class DiscChartComponent implements OnInit {

    @Input()
    data: number[] = [];

    @Input()
    labels: string[] = [];

    constructor() { }

    statColors = [
        'rgb(154, 168, 213)',
        'rgb(236, 163, 75)',
        'rgb(81, 181, 80)',
        'rgb(231, 26, 38)',
        'rgb(144, 195, 31)',
        'rgb(0, 176, 236)'
    ];
    // 144 195 31 zinc
    // 0 176 236 carbos
    // 81 181 80 iron
    // 231 26 38 calcium
    // 154 168 213 hp up
    // 236 163 75 protein

    ngOnInit(): void {
        // chartjs is weird
        // https://www.chartjs.org/docs/3.3.1/getting-started/integration.html
        // https://www.chartjs.org/docs/latest/charts/doughnut.html#pie
        // https://www.chartjs.org/docs/latest/
        Chart.register(PieController, ArcElement);
        Chart.register(ChartDataLabels);
        Chart.register(...registerables); // for legend, idk why
        // console.log(this.labels.map(text => { return {text}; }));

        const myChart = new Chart("resultChart", {
            type: 'pie',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Results',
                        data: this.data,
                        backgroundColor: this.statColors,
                        hoverOffset: 4
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        //labels: this.labels.map(text => { return {text}; })
                    }
                },
            }
        });
    }

}
