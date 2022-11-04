import { Medication } from "../medications/medications.model";

export class DayOfWeek {
  constructor(
    public morning?: Medication[],
    public midday?: Medication[],
    public evening?: Medication[],
    public night?: Medication []
  ) {}
}
