const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { type: String, required: true },
    source: { type: String, required: true },
    servings: { type: String, required: true },
    ingredients: [{
        value: {
            type: String,
            required: true
        }
    }],
    instructions: [{
        value: {
            type: String,
            required: true
        }
    }],
    submitted: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    author: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "user" }

});

module.exports = mongoose.model("recipe", recipeSchema);