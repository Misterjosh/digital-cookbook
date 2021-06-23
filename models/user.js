const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// passport local mongoose will come into play with login piece

const userSchema = new Schema({
    name: {
        first: { type: String, trim: true, required: true },
        last: { type: String, trim: true, required: true }
    },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    admin: {type: Boolean, required: true}
});

userSchema.virtual("fullName")
.get(() => {
    return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model("user", userSchema);