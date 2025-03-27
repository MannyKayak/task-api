const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  // mail must be unique and required
  email: {
    type: String,
    required: [true, "Email Obbligatoria"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password Obbligatoria"],
    minlength: 6,
  },
});

// password being crypted before saving
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
