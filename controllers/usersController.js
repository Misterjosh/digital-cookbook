const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {

    create: (req, res) => {
        db.User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                res.status(404).json({"email" : "That email is already registered!"})
            }
            else {
                const registerUser = new db.User({
                    name: {
                        first: req.body.name.first,
                        last: req.body.name.last
                    },
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(registerUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        registerUser.password = hash;
                        registerUser.save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                    })
                })
            }
        })
        .catch((err) => console.log(err));
    },

    findById: (req, res) => {
        db.User.findOne({ _id: req.query.id })
            .then(currentUser => res.json(currentUser))
            .catch(err => res.status(422).json(err));
    },

    findAll: (req, res) => {
        db.User.find(req.query)
            .then(users => res.json(users))
            .catch(err => res.status(422).json(err));
    },

    update: (req, res) => {
        db.User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                res.status(404).json({"email" : "That email is already registered!"})
            } else {
                const userId = req.params.id;
                const userParams = {
                    name: {
                        first: req.body.name.first,
                        last: req.body.name.last
                    },
                    email: req.body.email,
                    password: req.body.password,
                    updated: new Date
                }
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(userParams.password, salt, (err, hash) => {
                        if(err) throw err;
                        userParams.password = hash;
                        db.User.findById(userId)
                        .then((user) => user.updateOne(userParams))
                        .then(res.json(`Profile Updated`))
                        .catch((error) => console.log(error))
                    })
                })
            }
        })
        .catch((error) => console.log(error));
    },

    // if user doesn't include a password change, this avoids makeing a twice hashed password
    updateNoPass: (req, res) => {
        db.User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                res.status(404).json({"email" : "That email is already registered!"})
            } else {
                const userId = req.params.id;
                const userParams = {
                    name: {
                        first: req.body.name.first,
                        last: req.body.name.last
                    },
                    email: req.body.email,
                    password: req.body.password,
                    updated: new Date
                }
                db.User.findById(userId)
                .then((user) => user.updateOne(userParams))
                .then(res.json(`Profile Updated`))
                .catch((error) => console.log(error))
            }
        })
        .catch((error) => console.log(error));
    },
    
    delete: (req, res) => {
        db.User.findByIdAndDelete(req.params.id)
            .then(delUser => delUser.remove())
            .then(res.json("Account Deleted!"))
            .catch(err => res.status(422).json(err));
    },

    login: (req, res) => {
        db.User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) res.status(404).json({"email" : "That email doesn't exist!"});
            bcrypt.compare(req.body.password, user.password)
            .then((isMatch) => {
                if (!isMatch) res.status(400).json({"password" : "That password doesn't match!"})
                else {
                    const payload = {
                        id: user.id,
                        fName: user.name.first,
                        lName: user.name.last
                    }
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 900000
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer token: " + token
                            })
                        }
                    )
                }
            })
            .catch((err) => res.json(err.message));
        })
    }
};