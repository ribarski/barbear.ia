const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const BarberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cpf: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      required: false
    },
    barbershop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Barbershop',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BarberSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

BarberSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Barber', BarberSchema);