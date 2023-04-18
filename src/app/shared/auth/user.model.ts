export class User {
  constructor(
    public email: string,
    public id: number,
    public firstName: string,
    public lastName: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  public get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
