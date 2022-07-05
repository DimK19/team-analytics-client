import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { DiscChartComponent } from './disc-chart/disc-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonTypeComponent } from './mon-type/mon-type.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamFormComponent,
    DiscChartComponent,
    MonTypeComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
