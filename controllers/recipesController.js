const db = require('../models');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', true);

module.exports = {
    create: (req, res) => {
        db.Recipe.create(req.body)
            .then(recipe => res.json(`New Recipe created for ${recipe.name}!`))
            .catch(err => res.status(422).json(err));
    },
    
    findById: (req, res) => {
        db.Recipe.findById(req.params.id)
            .then(oneRecipe => res.json(oneRecipe))
            .catch(err => res.status(422).json(err));
    },

    findAll: (req, res) => {
        db.Recipe.find(req.query)
            .then(allRecipes => res.json(allRecipes))
            .catch(err => res.status(422).json(err));
    },

    update: (req, res) => {
        let recipeId = req.params.id;
        let recipeParams = {
            name: req.body.name,
            source: req.body.source,
            servings: req.body.servings,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            updated: new Date
        };

        db.Recipe.findOneAndUpdate(recipeId, { $set: recipeParams })
            .then(upRecipe => res.json(`Updated Recipe for: ${upRecipe.name}`))
            .catch(err => res.status(422).json(err));
    },

    delete: (req, res) => {
        db.Recipe.findByIdAndDelete(req.params.id)
            .then(delRec => delRec.remove())
            .then(res.json("Recipe Deleted!"))
            .catch(err => res.status(422).json(err));
    }
};