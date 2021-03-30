export class PatientModel {
  id: number;
  name: string;
  surname: string;
  birthDate: Date;
  gender: string;

  constructor(obj: any) {
    Object.assign(this, obj);
    this.birthDate = new Date(obj?.birthDate);
  }
}
