/* eslint-disable no-underscore-dangle */

class QuizClass {
  public quizteachcount: number;

  public quizcorrectcount: number;

  public quizwrongcount: number;

  constructor(
    quizteachcount: number,
    quizcorrectcount: number,
    quizwrongcount: number,
  ) {
    this.quizteachcount = quizteachcount;
    this.quizcorrectcount = quizcorrectcount;
    this.quizwrongcount = quizwrongcount;
  }
}

class GameClass {
  public playcount: number;

  public wincount: number;

  public losecount: number;

  constructor(playcount: number, wincount: number, losecount: number) {
    this.playcount = playcount;
    this.wincount = wincount;
    this.losecount = losecount;
  }
}

export default class UserRecClass {
  protected _talkcount: number;

  protected _teachcount: number;

  protected _forgetcount: number;

  protected _gamecount: GameClass;

  protected _quizcount: QuizClass;

  constructor(
    talkcount: number,
    teachcount: number,
    forgetcount: number,
    gamecount: GameClass,
    quizcount: QuizClass,
  ) {
    this._talkcount = talkcount;
    this._teachcount = teachcount;
    this._forgetcount = forgetcount;
    this._gamecount = gamecount;
    this._quizcount = quizcount;
  }

  public static InitUserRec() {
    return new UserRecClass(
      0,
      0,
      0,
      new GameClass(0, 0, 0),
      new QuizClass(0, 0, 0),
    );
  }
}
