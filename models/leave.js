const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Leave', leaveSchema);
