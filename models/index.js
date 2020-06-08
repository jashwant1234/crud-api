const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: { type: String, lowercase: true, trim: true, require: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

exports.UserModel = new model('users', userSchema);
