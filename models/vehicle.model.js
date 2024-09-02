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
}
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Vehicle', VehicleSchema);