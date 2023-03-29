export class Medication {
  constructor(
    public id: number,
    public name: string,
    public isCurrent: boolean,
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
