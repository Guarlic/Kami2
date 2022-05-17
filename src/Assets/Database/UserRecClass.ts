/* eslint-disable no-underscore-dangle */
export default class UserRecClass {
  private _talkcount: number;

  constructor(talkcount: number) {
    this._talkcount = talkcount;
  }

  public InitUserRec() {
    return new UserRecClass(0);
  }
}
