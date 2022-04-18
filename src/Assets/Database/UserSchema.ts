import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// 커맨드 스키마

// 유저 보유중 보석 목록
const gemSchema = new mongoose.Schema({ any: [] });

// 유저 데이터 스키마
const userSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    username: {
      type: String,
      require: true,
    },
    gems: {
      type: [gemSchema],
      default: [],
    },
    joined: {
      type: Boolean,
      require: true,
    },
    todaysgem: { type: Date },
    gemtime: { type: Date },
  },
  { timestamps: true, minimize: false },
);

// UserSchema.set('toJSON',{ getters : true })
const UserSchema = mongoose.model('User', userSchema);

export default { UserSchema };
