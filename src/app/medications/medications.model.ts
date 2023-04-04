export class Medication {
  constructor(
    public id: number,
    public name: string,
    public isCurrent: boolean,
    public dosage?: string,
    public frequency?: string,
    public date?: number,
    public day?: string,
    public morning?: boolean,
    public midday?: boolean,
    public evening?: boolean,
    public night?: boolean,
    public benefits?: string,
    public sideEffects?: string,
    public startDate?: string,
    public stopDate?: string,
    public reasonStopped?: string
    ) {}
}
