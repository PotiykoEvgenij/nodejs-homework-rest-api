const mongoose = require('mongoose');

const generateAvatar = require('../middleware/generateAvatar');

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatar: String,
    token: String,
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
});

userSchema.pre('save', function (next) {
    const email = this.email;
    const avatar = generateAvatar(email);
    this.avatar = avatar;
    next();
});

module.exports = mongoose.model("User", userSchema);