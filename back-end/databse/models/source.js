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
    description: {
        type: String
      },
    url: {
        type: String,
        required: true
      },
    category: {
        type: String
      },
    language: {
        type: String
      },
    country: {
        type: String
      },
    subscribers: {
        type: Number,
        default: 0
      }
    });

export const Source = mongoose.model('source', sourceSchema);

