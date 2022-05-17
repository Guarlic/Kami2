import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class UserClass {
  @prop({ required: true })
  public id!: string;

  @prop({ type: String, required: true, default: new Map<string, string>() })
  public records!: Map<string, string>;

  @prop({ required: true, default: 0 })
  public money!: number;

  @prop({ required: true, default: Date.now() })
  public JoinDate!: Date;
}

export const UserModel = getModelForClass(UserClass);
