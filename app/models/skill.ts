import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 5
        
    }
});

module.exports = mongoose.model('Skill', skillSchema);