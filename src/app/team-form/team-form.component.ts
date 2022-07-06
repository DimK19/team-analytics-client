import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

interface TestObject {
    name: string,
    nature: string,
    evs: Object
}

@Component({
    selector: 'TeamFormComponent',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.css', '../app.component.css']
})
export class TeamFormComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router) { }

    checkoutForm = this.formBuilder.group({
        team: ['']
    });

    ngOnInit(): void {
    }

    onSubmit(): void {
        // Process checkout data here
        //e.preventDefault();
        console.warn('Your order has been submitted', this.checkoutForm.value.team);
        console.log(this.parseInput(this.checkoutForm.value.team));
        this.checkoutForm.reset();
        this.router.navigate(['/result'])
    }

    parseInput(team: string): Object { // TODO IMPORTANT define return type as interface
        // https://github.com/smogon/pokemon-showdown/blob/master/sim/TEAMS.md
        // https://github.com/smogon/pokemon-showdown/blob/master/sim/teams.ts
        // showdown does it there, with the function 'unpack'
        // I want it in slightly different format and would rather do it from the beginning
        // and inefficiently

        // separate string by line
        var lines: string[] = team.split(/[\r\n]+/g);
        // not good, does not work for mons without item
        var names: string[] = lines.filter(x => x.includes('@'))
                                   .map(x => x.split('@')[0].trim());

        var evs: Object[] = lines.filter(x => x.includes('EVs'))
                                 .map(x => x.replace(/EVs: /g, '').split('/'))
                                 .map(x => this.convertEVArray(x));

        var natures: string[] = lines.filter(x => x.includes("Nature"))
                                     .map(x => x.split(' ')[0]);
        // split and parse
        // create object
        //return lines;

        let members: Object[] = [];

        for(let i = 0; i < 6; ++i) {
            members.push({
                "name": names[i],
                "ivs": [],
                "evs": evs[i],
                "nature": natures[i]
            });
        }

        return {"members": members};
    }

    convertEVArray(arr: string[]): Object[] {
        let res: Object[] = [];
        for(const i of arr) {
            let ev = {}
            let v: number = Number(i.trim().split(' ')[0]);
            let s: string = i.trim().split(' ')[1];
            ev = Object.assign({"stat" : s}, ev);
            ev = Object.assign({"value" : v}, ev);
            res.push({"ev" : ev});
        }

        return res;
    }
}
