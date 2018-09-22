const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUsers = (req, res) => {
    Users.find({})
        .then(users => {
            res.status(200).send(users);
        })
        .catch(err => res.status(500).send(err));
}

exports.signUpUser = (req, res) => {
    Users.find({}).where({ email: req.body.email })
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail Already Exists"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        Users.create({
                            name: req.body.name,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            password: hash
                        })
                            .then(user => {
                                return res.status(201).send(user)
                            })
                            .catch(err => res.status(500).send(err))
                    }
                })
            }
        })
}

exports.loginUser = (req, res) => {
    Users.find({}).where({ email: req.body.email })
        .then(user => {
            if (user.length < 1) {
                res.status(401);
            }
            bcrypt.compare(req.body.password, user[0].password, (err, response) => {
                if (err) {
                    return res.status(401);
                }
                if (response) {
                    const token = jwt.sign({
                        email: user[0].email,
                        id: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {expiresIn: "1h"})
                    return res.status(200).json({
                        message: "Auth Successful",
                        token: token,
                    })
                }
                return res.status(401);

            })
        })
        .catch(err => res.status(500).send(err))
}



exports.deleteUser = (req, res) => {
    Users.remove({}).where({ _id: req.params.id })
        .then(doc => {
            res.status(200).send(doc);
        })
        .catch(err => res.status(500).send(err));
}