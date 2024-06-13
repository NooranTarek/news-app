import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sourceId: {
        type: String,
        required: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
});

export const Subscription = mongoose.model('subscription', subscriptionSchema);

