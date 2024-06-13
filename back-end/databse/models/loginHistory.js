import mongoose from 'mongoose';

const loginHistorySchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    success: Boolean
});

export const LoginHistory = mongoose.model('loginHistory', loginHistorySchema);

