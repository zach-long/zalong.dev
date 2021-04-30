import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    siteHeader: {
        type: String
    },
    bio: {
        type: String
    },
    siteFooter: {
        type: String
    },
    active: {
        type: Boolean
    }
});

module.exports = mongoose.model('Settings', settingsSchema);