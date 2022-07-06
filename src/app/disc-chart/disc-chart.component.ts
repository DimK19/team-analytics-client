import { Component, OnInit, Input } from '@angular/core';
import { Chart, PieController, ArcElement, registerables } from 'chart.js';

@Component({
    selector: 'DiscChartComponent',
    templateUrl: './disc-chart.component.html',
    styleUrls: ['./disc-chart.component.css']
})
export class DiscChartComponent implements OnInit {

    @Input()
    chartID: string = "";

    @Input()
    data: number[] = [];

    @Input()
    labels: string[] = [];

    @Input()
    title: string = '';

    constructor() { }

    public publicChartID: string = '';
    public publicTitle: string = '';

    statColors = [
        'rgb(154, 168, 213)',
        'rgb(236, 163, 75)',
        'rgb(0, 100, 50)',
        'rgb(231, 26, 38)',
        'rgb(144, 195, 31)',
        'rgb(0, 176, 236)'
    ];

    natureColors = [
        'rgb(0, 0, 150)',
        'rgb(80, 0, 0)',
        'rgb(127, 127, 127)'
    ];

    ngOnInit(): void {
        this.publicChartID = this.chartID;
        this.publicTitle = this.title;
    }

    // I remembered hooks from react!! https://angular.io/guide/lifecycle-hooks
    ngAfterViewInit(): void {
        // chartjs is weird
        // https://www.chartjs.org/docs/3.3.1/getting-started/integration.html
        // https://www.chartjs.org/docs/latest/charts/doughnut.html#pie
        // https://www.chartjs.org/docs/latest/
        Chart.register(PieController, ArcElement);
        Chart.register(...registerables); // for legend, idk why
        // console.log(this.labels.map(text => { return {text}; }));

        const myChart = new Chart(this.chartID, {
            type: 'pie',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Results',
                        data: this.data,
                        backgroundColor: this.data.length == 6 ? this.statColors : this.natureColors,
                        hoverOffset: 4
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        //labels: this.labels.map(text => { return {text}; })
                        onClick: function(event, legendItem) {}
                    }
                },
            }
        });
    }

}
