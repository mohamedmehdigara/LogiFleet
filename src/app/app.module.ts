import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShipmentWizardComponent } from './components/shipment-wizard/shipment-wizard.component';
import { ShipmentListComponent } from './components/shipment-list/shipment-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShipmentWizardComponent,
    ShipmentListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }