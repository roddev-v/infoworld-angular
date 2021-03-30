import {Injectable} from '@angular/core';
import {PatientModel} from '../models/patientModel';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ClinicService {
  private patients: PatientModel[];

  constructor(private http: HttpClient) {
  }

  async get(id: number): Promise<PatientModel> {
    const patients = await this.getAllPatients();
    const index = patients.findIndex(patient => patient.id === id);
    return this.patients[index];
  }

  async getAllPatients(): Promise<PatientModel[]> {
    if (!this.patients) {
      const res: any[] = await this.http.get<any[]>('./assets/mock/mock.json').toPromise();
      this.patients = res.map(item => new PatientModel((item)));
    }
    return this.patients;
  }

  // async because it could be a HTTP call here.
  async deletePatient(id: number): Promise<void> {
    const index = this.patients.findIndex(patient => patient.id === id);
    if (index !== -1) {
      this.patients.splice(index, 1);
    }
  }

  async post(patient: PatientModel): Promise<void> {
    const ids = this.patients.map(patien => patien.id);
    const maxId = Math.max(...ids);
    patient.id = maxId + 1; // auto increment increment the id
    this.patients.push(patient);
  }

  async put(id: number, patient: PatientModel): Promise<void> {
    await this.deletePatient(id);

    patient.id = id;
    this.patients.push(patient);
  }
}
