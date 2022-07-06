import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ResultComponent',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    constructor() { }

    public evLabels = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];
    public natureLabels = ['Offensive', 'Defensive', 'Speed'];

    public evs = [
        0.2293963254593176,
        0.24803149606299213,
        0.105249343832020997,
        0.11535433070866143,
        0.093937007874015748,
        0.20803149606299213
    ].map(x => Math.round(x * 10000) / 100);

    public natures = [4, 1, 2];

    public weakPairs = [
        [
            "water",
            "fire"
        ]
    ];

    public unresistedPairs = [
        [
            "bug",
            "flying"
        ],
        [
            "bug",
            "ghost"
        ],
        [
            "bug",
            "ice"
        ],
        [
            "bug",
            "normal"
        ],
        [
            "bug",
            "psychic"
        ],
        [
            "bug",
            "rock"
        ],
        [
            "dark",
            "electric"
        ],
        [
            "dark",
            "fairy"
        ],
        [
            "dark",
            "fire"
        ],
        [
            "dark",
            "flying"
        ],
        [
            "dark",
            "ghost"
        ],
        [
            "dark",
            "grass"
        ],
        [
            "dark",
            "ground"
        ],
        [
            "dark",
            "ice"
        ],
        [
            "dark",
            "normal"
        ],
        [
            "dark",
            "poison"
        ],
        [
            "dark",
            "psychic"
        ],
        [
            "dark",
            "rock"
        ],
        [
            "dark",
            "steel"
        ],
        [
            "dark",
            "water"
        ],
        [
            "dragon",
            "electric"
        ],
        [
            "dragon",
            "fairy"
        ],
        [
            "dragon",
            "fire"
        ],
        [
            "dragon",
            "flying"
        ],
        [
            "dragon",
            "ghost"
        ],
        [
            "dragon",
            "grass"
        ],
        [
            "dragon",
            "ground"
        ],
        [
            "dragon",
            "ice"
        ],
        [
            "dragon",
            "normal"
        ],
        [
            "dragon",
            "poison"
        ]
    ];

    ngOnInit(): void {
    }

}
