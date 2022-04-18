import mongoose from 'mongoose';

// 커맨드 스키마

const cmdSchema = new mongoose.Schema({
  CmdName: {
    type: String,
    require: true,
  },
  output: {
    type: String,
    require: true,
  },
  react: {
    type: String,
  },
  owneroutput: {
    type: String,
  },
  ownerreact: {
    type: String,
  },
  customcmd: {
    type: String,
  },
});

// CmdSchema.set('toJSON',{ getters : true })
const CmdSchema = mongoose.model('Cmd', cmdSchema);

export default { CmdSchema };
