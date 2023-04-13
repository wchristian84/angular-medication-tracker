export class Medication {
  constructor(
    public name: string,
    public is_current: boolean,
    public dosage?: string | null,
    public frequency?: string | null,
    public date?: number | null,
    public day?: string | null,
    public morning?: boolean | null,
    public midday?: boolean | null,
    public evening?: boolean | null,
    public night?: boolean | null,
    public benefits?: string | null,
    public side_effects?: string | null,
    public start_date?: string | null,
    public stop_date?: string | null,
    public reason_stopped?: string | null,
    public id?: number,
    public user_id?: number | null
    ) {}
}
