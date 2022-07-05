import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamFormComponent } from './team-form/team-form.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
    {path: '', component: TeamFormComponent},
    {path: 'result', component: ResultComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
