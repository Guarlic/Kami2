import typegoose from '@typegoose/typegoose';
import UserRecClass from './UserRecClass.js';

const { prop, getModelForClass } = typegoose;

export class UserClass {
  @prop({ required: true })
  public id!: string;

  @prop({ required: true, default: UserRecClass.InitUserRec() })
  public records!: UserRecClass;

  @prop({ required: true, default: Date.now() })
  public JoinDate!: Date;
}

export const UserModel = getModelForClass(UserClass);
