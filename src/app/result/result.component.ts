import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interaction } from '../team-form/team-form.component';

@Component({
    selector: 'ResultComponent',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    constructor(private router: Router) { }

    // ? returns undefined when the object is null, ! expresses
    // certainty that it never will be. Both are used to temporarily avoid
    // errors "Object is possibly null" or "undefined"
    private state = this.router.getCurrentNavigation()?.extras!.state!;
    public hs: number = this.state['highest_speed'];
    public ls: number = this.state['lowest_speed'];

    public evLabels = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];
    public natureLabels = ['Offensive', 'Defensive', 'Speed'];
    public monTypes = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];

    public interactions: Interaction[] = this.state['individual_interactions'];

    public totalInteractions: any = {};

    public evs: number[] = Object.values(this.state['evs']).map(x => Math.round(Number(x) * 10000) / 100);

    public natures: number[] = Object.values(this.state['natures']);

    public weakPairs = this.state['weak_pairs'];
    public unresistedPairs = this.state['unresisted_pairs'];

    ngOnInit(): void {
        for(const i of this.monTypes) {
            let weakCount = this.interactions.reduce((acc: any, cur: any) => (cur.interactions[i] === 2 || cur.interactions[i] === 4) ? ++acc : acc, 0);
            let resCount = this.interactions.reduce((acc: any, cur: any) => (cur.interactions[i] === 0.5 || cur.interactions[i] === 0.25) ? ++acc : acc, 0);
            let immCount = this.interactions.reduce((acc: any, cur: any) => cur.interactions[i] === 0 ? ++acc : acc, 0);

            this.totalInteractions = Object.assign(
                {
                    [i] : {
                        'weak' : weakCount,
                        'resist': resCount,
                        'immune': immCount
                    }
                }, this.totalInteractions);

            // console.log(this.totalInteractions);
            // console.log(this.evs);
            console.log(this.natures);
        }
    }

}
