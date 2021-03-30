import {Component, OnInit} from '@angular/core';
import {PatientModel} from '../../models/patientModel';
import {ClinicService} from '../../services/clinic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  patient: PatientModel;
  patientId: number;
  form: FormGroup;
  today = new Date();

  constructor(private clinicService: ClinicService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    const snapshot = activatedRoute.snapshot;
    this.patientId = +snapshot.params?.id;
  }

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      name: new FormControl(undefined, [Validators.required]),
      surname: new FormControl(undefined, [Validators.required]),
      gender: new FormControl(undefined, [Validators.required]),
      birthDate: new FormControl(undefined, [Validators.required]),
      cnp: new FormControl(undefined, [Validators.required, Validators.minLength(13)]),
      tel: new FormControl(undefined, [Validators.required])
    });
    this.patient = await this.clinicService.get(this.patientId);

    // id = 0 means a new entry
    if (this.patientId !== 0) {
      this.form.patchValue({
        name: this.patient.name,
        surname: this.patient.surname,
        gender: this.patient.gender,
        birthDate: this.formatDate(this.patient.birthDate)
      });
    }
  }

  formatDate(d: Date): string {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  async submit(): Promise<void> {
    const values = this.form.value;
    values.birthDate = new Date(values.birthDate);
    const patient = new PatientModel(values);

    if (this.patientId === 0) {
      await this.clinicService.post(patient);
      await this.router.navigate(['']);
    } else {
      await this.clinicService.put(this.patientId, patient);
      await this.router.navigate(['']);
    }
  }
}
