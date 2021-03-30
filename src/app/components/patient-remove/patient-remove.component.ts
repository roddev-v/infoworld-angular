import {Component, OnInit} from '@angular/core';
import {ClinicService} from '../../services/clinic.service';
import {PatientModel} from '../../models/patientModel';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-patient-remove',
  templateUrl: './patient-remove.component.html',
  styleUrls: ['./patient-remove.component.scss']
})
export class PatientRemoveComponent implements OnInit {
  patient: PatientModel;
  patientId: number;

  constructor(private clinicService: ClinicService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    const snapshot = activatedRoute.snapshot;
    this.patientId = +snapshot.params?.id;
  }

  async ngOnInit(): Promise<void> {
    this.patient = await this.clinicService.get(this.patientId);
  }

  async cancel(): Promise<void> {
    await this.router.navigate(['']);
  }

  async delete(): Promise<void> {
    await this.clinicService.deletePatient(this.patientId);
    await this.router.navigate(['']);
  }

}
