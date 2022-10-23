export class Medication {
  name: string;
  dosage: string;
  frequency: string;
  benefits: string;
  sideEffects: string;
  startDate: string;
  stopDate: string;
  reasonStopped: string;

  constructor(name: string, dosage: string, frequency: string, benefits: string, sideEffects: string, startDate: string, stopDate: string, reasonStopped: string) {
    this.name = name;
    this.dosage = dosage;
    this.frequency = frequency;
    this.benefits = benefits;
    this.sideEffects = sideEffects;
    this.startDate = startDate;
    this.stopDate = stopDate;
    this.reasonStopped = reasonStopped;
  }
}
