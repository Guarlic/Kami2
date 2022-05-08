import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class CmdClass {
  @prop()
  public CmdName!: string;

  @prop()
  public output!: string;

  @prop()
  public react?: string;

  @prop()
  public informerid!: string;

  @prop()
  public informernametag!: string;
}

export const CmdModel = getModelForClass(CmdClass);
