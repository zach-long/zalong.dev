import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    stack: {
        type: String
    },
    image: {
        type: String
    },
    url: {
        type: String
    },
    active: {
        type: Boolean
    }
});

module.exports = mongoose.model('Project', projectSchema);