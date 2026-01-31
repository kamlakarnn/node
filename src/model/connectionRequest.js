const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // reference to User model
        required: true  
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },  
    status: {
        type: String,
        required: true,
        enum: ['ignored', 'interested', 'accepted', 'rejected'],
        message: `{VALUE} is incorrect status type`,
    }
}, { timestamps: true } );  

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })

connectionRequestSchema.pre('save', async function() {
    const connectionRequest = this;

    // Prevent users from sending connection requests to themselves
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return new Error("Cannot send connection request to yourself");
    }

    // next();
});

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest; 