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

    findAllByAuthor: (req, res) => {
        db.Recipe.find({authorId: req.params.id})
            .then(allRecipes => res.json(allRecipes))
            .catch(err => res.status(422).json(err));
    },

    update: (req, res) => {
        const recipeId = req.params.id;
        const recipeParams = {
            name: req.body.name,
            source: req.body.source,
            servings: req.body.servings,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            updated: new Date
        };

        db.Recipe.findById(recipeId)
            .then((recipe) => recipe.updateOne(recipeParams))
            .then(res.json("Recipe Updated!"))
            .catch(err => res.status(422).json(err));
    },

    delete: (req, res) => {
        db.Recipe.findByIdAndDelete(req.params.id)
            .then(delRec => delRec.remove())
            .then(res.json("Recipe Deleted!"))
            .catch(err => res.status(422).json(err));
    }
};