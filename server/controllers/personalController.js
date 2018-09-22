const Profesores = require('../models/profesores');


exports.getAllProfesores = (req, res) => {

    Profesores.find({}).sort({ nombre: 1 }).then(profesores => {
        return res.status(200).send(profesores);
    }, err => {
        return res.status(500).send(err);
    });
}

//db.collection.find().sort({internalDate: 1}).collation({locale: "en_US", numericOrdering: true})


exports.addProfesor = (req, res) => {
    Profesores.create({
        nombre: req.body.nombre
    }).then(profesor => {
        console.log(profesor);
        return res.status(201).send(profesor);
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
}