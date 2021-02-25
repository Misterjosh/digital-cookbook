const db = require('../models');
const mongoose = require('mongoose');
// findOneAndUpdate triggers a warning without this
mongoose.set('useFindAndModify', true);

module.exports = {
    create: (req, res) => {
        db.User.create(req.body)
            .then(newUser => res.json(`New account created for ${newUser.fullName}!`))
            .catch(err => res.status(422).json(err));
    },

    findById: (req, res) => {
        db.User.findById(req.params.id)
            .then(currentUser => res.json(currentUser))
            .catch(err => res.status(422).json(err));
    },

    findAll: (req, res) => {
        db.User.find(req.query)
            .then(users => res.json(users))
            .catch(err => res.status(422).json(err));
    },

    update: (req, res) => {
        let userId = req.params.id;
        let userParams = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            updated: new Date
        };

        db.User.findOneAndUpdate(userId, { $set: userParams })
            .then(upUser => res.json(`Profile Updated for: ${upUser.fullName}`))
            .catch(err => res.status(422).json(err));
    },
    
    delete: (req, res) => {
        db.User.findByIdAndDelete(req.params.id)
            .then(delUser => delUser.remove())
            .then(res.json("Account Deleted!"))
            .catch(err => res.status(422).json(err));
    }
};