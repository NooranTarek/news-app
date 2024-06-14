import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    sourceId: {
        type: String,
        required: true
      },
    author: {
        type: String
      },
    title: {
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
    urlToImage: {
        type: String
      },
    publishedAt: {
        type: Date,
        required: true
      },
    content: {
        type: String
      }
    });

export const News = mongoose.model('news', newsSchema);

