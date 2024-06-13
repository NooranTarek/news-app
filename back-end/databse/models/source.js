import mongoose from 'mongoose';

const sourceSchema = new mongoose.Schema({
    sourceId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    url: String,
    category: String,
    language: String,
    country: String
});

export const Source = mongoose.model('source', sourceSchema);

