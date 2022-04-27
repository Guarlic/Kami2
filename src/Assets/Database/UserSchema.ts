import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

class User {
  @prop()
  public CmdName!: string;

  @prop()
  public output!: string;

  @prop()
  public react?: string;
}

const UserModel = getModelForClass(User);

export default UserModel;
