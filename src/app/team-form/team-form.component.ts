import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface MonObj {
    mon: {
        name: string,
        types: string[],
        speed: number
    }
}

export interface NatObj {
    offensive: number,
    defensive: number,
    speed: number
}

export interface EvObj {
    hp: number,
    atk: number,
    def: number,
    spa: number,
    spd: number,
    spe: number
}

export interface Types {
    bug: number,
    dark: number,
    dragon: number,
    electric: number,
    fairy: number,
    fighting: number,
    fire: number,
    flying: number,
    ghost: number,
    grass: number,
    ground: number,
    ice: number,
    normal: number,
    poison: number,
    psychic: number,
    rock: number,
    steel: number,
    water: number
}

export interface Interaction {
    name: string,
    interactions: Types
}

export interface Response {
    mons: MonObj[],
    nature: NatObj,
    evs: EvObj,
    unresisted_pairs: string[][],
    weak_pairs: string[][],
    individual_interations: Interaction[]
}

@Component({
    selector: 'TeamFormComponent',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.css', '../app.component.css']
})
export class TeamFormComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

    checkoutForm = this.formBuilder.group({
        team: ['']
    });

    ngOnInit(): void {
    }

    onSubmit(): void {
        //e.preventDefault();
        console.log(this.parseInput(this.checkoutForm.value.team));
        // this.checkoutForm.reset();
        this.http.post<Response>('http://localhost:3000/team', this.parseInput(this.checkoutForm.value.team))
        //this.http.post<any>('http://localhost:3000/team', req)
            .subscribe( response => {
                console.log(response);
                this.router.navigate(['/result'], {state: response});
            });
    }

    parseInput(team: string): Object { // TODO IMPORTANT define return type as interface
        // https://github.com/smogon/pokemon-showdown/blob/master/sim/TEAMS.md
        // https://github.com/smogon/pokemon-showdown/blob/master/sim/teams.ts
        // showdown does it there, with the function 'unpack'
        // I want it in slightly different format and would rather do it from the beginning
        // and inefficiently

        // separate string by line
        var lines: string[] = team.split(/[\r\n]+/g);
        // each block corresponding to a mon consists of (at most, because the format is badly designed) ten lines:
        // name, ability, level, evs, nature, ivs, and four moves that start with '- '
        var names: string[] = lines.filter(x => !x.includes('EVs') && !x.includes('IVs') && !x.includes('Ability') && !x.includes('Nature') && !x.includes('Level') && !x.includes('- '))
                                   .map(x => x.split('@')[0].trim());

        var evs: Object[] = lines.filter(x => x.includes('EVs'))
                                 .map(x => x.replace(/EVs: /g, '').split('/'))
                                 .map(x => this.convertStatArray(x));

        // all this hack-y inefficiency because not every mon-block is guaranteed
        // to include iv field and thus I resort to using a guaranteed field as anchor
        var ivs_aux: string[][] = [];
        var flag: boolean = true; // 1 iv, 0 nature
        for(let i of lines) {
            if(i.includes('IVs')) {
                ivs_aux.push(i.replace(/IVs: /g, '').split('/'));
                flag = true;
            }
            else if(i.includes('Nature')) {
                if(!flag) ivs_aux.push([]);
                flag = false;
            }
        }
        var ivs: Object[] = ivs_aux.map(x => this.convertStatArray(x, 'iv'));

        var natures: string[] = lines.filter(x => x.includes("Nature"))
                                     .map(x => x.split(' ')[0]);

        let members: Object[] = [];

        for(let i = 0; i < 6; ++i) {
            members.push({
                'name': names[i],
                'ivs': ivs[i],
                'evs': evs[i],
                'nature': natures[i]
            });
        }

        return {'members': members};
    }

    convertStatArray(arr: string[], type: string = 'ev'): Object[] {
        let res: Object[] = [];
        for(const i of arr) {
            let ev = {}
            let v: number = Number(i.trim().split(' ')[0]);
            let s: string = i.trim().split(' ')[1];
            ev = Object.assign({'stat' : s}, ev);
            ev = Object.assign({'value' : v}, ev);
            res.push({[type] : ev});
        }

        return res;
    }
}
