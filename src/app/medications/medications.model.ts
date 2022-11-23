export class Medication {
  constructor(
    public name: string,
    public dosage?: string,
    public frequency?: string,
    public date?: number,
    public day?: string,
    public timeOfDay?: {
      Morning: boolean,
      Midday: boolean,
      Evening: boolean,
      Night: boolean
    },
    public benefits?: string,
    public sideEffects?: string,
    public startDate?: string,
    public stopDate?: string,
    public reasonStopped?: string
    ) {}
}
