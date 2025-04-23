const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
      email: {
            type: String,
            unique: true,
            required: [true, "A user must have an email"],
      },
      password: {
            type: String,
            required: [true, "A user must have a passoword"]
      }
})



userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();

      this.password = await bcrypt.hash(this.password, 10);
      next();
});

const User = mongoose.model('User', userSchema);
module.exports = User; 