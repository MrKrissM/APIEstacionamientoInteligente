const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  plate: { 
    type: String, 
    required: true, 
    maxlength: 8,
    unique: true
  },
  type: { 
    type: String, 
    required: false, 
    maxlength: 100 
  },
  // Añade estos campos nuevos
  model: {
    type: String,
    required: false,
    maxlength: 100
  },
  brand: {
    type: String,
    required: false,
    maxlength: 100
  },
  color: {
    type: String,
    required: false,
    maxlength: 50
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  },
  toObject: {
    virtuals: true
  }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);