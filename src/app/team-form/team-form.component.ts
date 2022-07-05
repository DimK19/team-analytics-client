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
    styleUrls: ['./team-form.component.css']
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
        this.parseInput(this.checkoutForm.value.team);
        this.checkoutForm.reset();
        this.router.navigate(['/result'])
    }

    parseInput(team: string): void { // TODO IMPORTANT define return type as interface
        // https://github.com/smogon/pokemon-showdown/blob/master/sim/TEAMS.md
        // https://github.com/smogon/pokemon-showdown/blob/master/sim/teams.ts
        // showdown does it there, with the function 'unpack'
        // I want it in slightly different format and would rather do it from the beginning
        // and inefficiently

        // separate string by line
        var lines: string[] = team.split(/[\r\n]+/g);
        // not good, does not work for mons without item
        var names: string[] = lines.filter(x => x.includes("@"));
        console.log(names);

        var evs: string[] = lines.filter(x => x.includes("EVs"));
        console.log(evs);

        /*
        var evs = lines.map(x => {
            if(x.includes("EVs")) return x;
            else return null;
        }).filter(x => x);
        */

        var natures: string[] = lines.filter(x => x.includes("Nature"));
        console.log(natures);
        // split and parse
        // create object
        //return lines;
    }
}
