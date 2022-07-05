import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'MonTypeComponent',
    templateUrl: './mon-type.component.html',
    styleUrls: ['./mon-type.component.css']
})
export class MonTypeComponent implements OnInit {

    @Input()
    typeParam: string = 'normal';

    public typeName: string = 'normal';

    constructor() { }

    ngOnInit(): void {
        this.typeName = this.typeParam;
    }

}
