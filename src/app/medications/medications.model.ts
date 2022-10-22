export class Medication {
  private name: string;
  private dosage: string;
  private frequency: string;
  private benefits: string;
  private sideEffects: string;
  private startDate: Date;
  private stopDate: Date;
  private reasonStopped: string;

  constructor(name: string, dosage: string, frequency: string, benefits: string, sideEffects: string, startDate: Date, stopDate: Date, reasonStopped: string) {
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
