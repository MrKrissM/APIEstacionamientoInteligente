const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  plate: { 
    type: String, 
    required: true, 
    maxlength: 100 
},
  type: { 
    type: String, 
    required: true, 
    maxlength: 100 
}
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Vehicle', VehicleSchema);