export class Medication {
  constructor(
    public name: string,
    public dosage?: string,
    public frequency?: string,
    public benefits?: string,
    public sideEffects?: string,
    public startDate?: string,
    public stopDate?: string,
    public reasonStopped?: string
    ) {}
}
