import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ClinicService} from '../../services/clinic.service';
import {PatientModel} from '../../models/patientModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientsListComponent implements OnInit {
  patients: PatientModel[] = [];

  constructor(private clinicService: ClinicService,
              private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    await this.getAllPatients();
  }

  async deletePatient(patientId: number): Promise<void> {
    await this.router.navigate(['delete', patientId]);
  }

  async editPatient(patientId: number): Promise<void> {
    await this.router.navigate([patientId]);
  }

  private async getAllPatients(): Promise<void> {
    this.patients = await this.clinicService.getAllPatients();
  }
}
