import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PatientsListComponent} from './components/patients-list/patients-list.component';
import {ClinicService} from './services/clinic.service';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { PatientRemoveComponent } from './components/patient-remove/patient-remove.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PatientsListComponent,
    PatientDetailsComponent,
    PatientRemoveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ClinicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
