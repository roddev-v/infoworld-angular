import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientsListComponent} from './components/patients-list/patients-list.component';
import {PatientDetailsComponent} from './components/patient-details/patient-details.component';
import {PatientRemoveComponent} from './components/patient-remove/patient-remove.component';

const routes: Routes = [
  {path: '', component: PatientsListComponent, pathMatch: 'full'},
  {path: 'delete/:id', component: PatientRemoveComponent},
  {path: ':id', component: PatientDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
