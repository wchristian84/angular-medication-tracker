export class Medication {
  constructor(
    public id: number | null,
    public name: string,
    public isCurrent: boolean,
    public dosage?: string | null,
    public frequency?: string | null,
    public date?: number | null,
    public day?: string | null,
    public morning?: boolean | null,
    public midday?: boolean | null,
    public evening?: boolean | null,
    public night?: boolean | null,
    public benefits?: string | null,
    public sideEffects?: string | null,
    public startDate?: string | null,
    public stopDate?: string | null,
    public reasonStopped?: string | null
    ) {}
}
