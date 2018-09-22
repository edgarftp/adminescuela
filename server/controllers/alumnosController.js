const Alumnos = require('../models/alumnos');
const Familias = require('../models/familias');
const Inscripciones = require('../models/inscripciones');
const Pagos = require('../models/pagos');

exports.getAllAlumnos = (req, res) => {

    Alumnos.find({}).sort({ apellidoP: 1, apellidoM: 1, nombre: 1}).then(alumnos => {
        return res.status(200).send(alumnos);
    }, err => {
        return res.status(500).send(err);
    });
}

exports.addAlumno = (req, res) => {
    Alumnos.create({
        matricula: req.body.alumno.matricula,
        nombre: req.body.alumno.nombre,
        apellidoP: req.body.alumno.apellidoP,
        apellidoM: req.body.alumno.apellidoM,
        sexo: req.body.alumno.sexo,
        fechaNacimiento: req.body.alumno.fechaNacimiento,
        curp: req.body.alumno.curp,
        procedencia: req.body.alumno.procedencia,
        familia: req.body.alumno.familia

    }).then(alumno => {
        console.log(alumno);
        return res.status(201).send(alumno);
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
}

exports.getAllFamilias = (req, res) => {

    Familias.find({}).then(familias => {
        return res.status(200).send(familias);
    }, err => {
        return res.status(500).send(err);
    });
}

exports.addFamilia = (req, res) => {
    Familias.create({
        papa: req.body.familia.papa,
        mama: req.body.familia.mama,
        direccion: req.body.familia.direccion,
        telCasa: req.body.familia.telCasa

    }).then(alumno => {
        console.log(alumno);
        return res.status(201).send(alumno);
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
}

exports.getAllInscripciones = (req, res) => {

    Inscripciones.find({}).then(inscripciones => {
        return res.status(200).send(inscripciones);
    }, err => {
        return res.status(500).send(err);
    });
}

exports.addInscripcion = (req, res) => {
    Inscripciones.create({
        alumno: req.body.insc.alumno,
        grupo: req.body.insc.grupo
    }).then(alumno => {
        console.log(alumno);
        return res.status(201).send(alumno);
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
}

exports.conceptosAlumno = (req, res) => {
    const id=req.params.id;
    Inscripciones.findOne({}).where({_id: id})
    .populate("grupo")
    .then(conceptos => {
        return res.status(200).send(conceptos);
    }, err => {
        return res.status(500).send(err);
    });
}

exports.addPagos = (req, res) => {
    Pagos.create(req.body.pagos, (err, pagos)=> {
        if(err => res.status(500).send(err));
        return res.status(201).send(pagos);
    })
}


