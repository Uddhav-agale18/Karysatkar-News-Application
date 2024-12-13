const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Profile', profileSchema);
