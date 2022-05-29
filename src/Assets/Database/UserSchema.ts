import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class UserClass {
  @prop({ required: true })
  public id!: string;

  @prop({ required: true, default: Date.now() })
  public JoinDate!: Date;
}

export const UserModel = getModelForClass(UserClass);
