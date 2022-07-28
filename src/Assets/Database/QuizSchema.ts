import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class QuizClass {
  @prop({ required: true })
  public quizName!: string;

  @prop({ required: true })
  public answer!: string;

  @prop()
  public hint?: string;

  @prop({ required: true, default: null })
  public level!: number;

  @prop({ required: true, default: null })
  public score!: number;

  @prop({ required: true })
  public informernametag!: string;

  @prop({ required: true })
  public informerid!: string;

  @prop({ required: true, default: null })
  public checkerid!: string;

  @prop({ required: true, default: null })
  public checkername!: string;

  @prop({ required: true, default: Date.now() })
  public createDate!: Date;
}

export const QuizModel = getModelForClass(QuizClass);
