const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'users'},
    description: {type: String, required: true},
    insertedAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: undefined},
});

let TasksModel = mongoose.model('tasks', TaskSchema);

// Export the model
module.exports = TasksModel;