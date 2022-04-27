import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

class Cmd {
  @prop({ required: true })
  public id!: string;

  @prop({ required: true })
  public GemDate!: Date;

  @prop({ type: String, required: true })
  public gems!: Map<String, String>;

  @prop({ required: true })
  public money!: number;

  @prop({ required: true, default: Date.now() })
  public JoinDate!: Date;
}

const CmdModel = getModelForClass(Cmd);

export default CmdModel;
