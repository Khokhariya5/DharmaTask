const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CitySchema = new Schema({
    city: {type: Schema.Types.String},
    insertedAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: undefined},
});

let CityModel = mongoose.model('cities', CitySchema);

// Export the model
module.exports = CityModel;