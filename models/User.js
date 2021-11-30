const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

//Cascade delete
UserSchema.pre('remove', async function (next) {
  await this.model('Contact').deleteMany({
    user: this._id
  });
  next();
});

module.exports = mongoose.model("User", UserSchema);