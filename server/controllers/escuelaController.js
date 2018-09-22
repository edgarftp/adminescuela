const Ciclos = require('../models/ciclosEscolares');
const Niveles = require('../models/niveles');
const Grados = require('../models/grados');
const Campus = require('../models/campus');
const Aulas = require('../models/aulas');
const Grupos = require('../models/grupos');
const Conceptos = require('../models/conceptos');

exports.getAllCiclos = (req, res) => {

    Ciclos.find({}).sort({ ciclo: -1 }).collation({ locale: "en_US", numericOrdering: true }).then(ciclos => {
        return res.status(200).send(ciclos);
    }, err => {
        return res.status(500).send(err);
    });
}

//db.collection.find().sort({internalDate: 1}).collation({locale: "en_US", numericOrdering: true})


exports.addCiclo = (req, res) => {
    Ciclos.create({
        ciclo: req.body.ciclo
    }).then(ciclo => {
        console.log(ciclo);
        return res.status(201).send(ciclo);
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
}

exports.getAllNiveles = (req, res) => {

    Niveles.find({}).then(niveles => {
        return res.status(200).send(niveles);
    }, err => {
        return res.status(500).send(err);
    });
}


exports.addNivel = (req, res) => {
    Niveles.create({
        nivel: req.body.nivel
    }).then(nivel => {
        console.log(nivel);
        return res.status(201).send(nivel);
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
}

exports.getAllGrados = (req, res) => {
    //console.log(Estado.findAll());
    Grados.find({}).sort({ grado: 1 }).then(grados => {
        return res.status(200).send(grados);
    }, err => {
        return res.status(500).send(err);
    });
}

exports.addGrado = (req, res) => {
    Grados.create({
        grado: req.body.grado,
    }).then(grado => {
        console.log(grado);
        return res.status(201).send(grado);
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
}

exports.getAllCampus = (req, res) => {
    //console.log(Estado.findAll());
    Campus.find({}).then(campus => {
        return res.status(200).send(campus);
    }, err => {
        return res.status(500).send(err);
    });
}

exports.addCampus = (req, res) => {
    Campus.create({
        campus: req.body.campus,
    }).then(campus => {
        console.log(campus);
        return res.status(201).send(campus);
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
}

exports.getAllAulas = (req, res) => {
    //console.log(Estado.findAll());
    Aulas.find({}).then(aulas => {
        return res.status(200).send(aulas);
    }, err => {
        return res.status(500).send(err);
    });
}

//db.collection.find().sort({internalDate: 1}).collation({locale: "en_US", numericOrdering: true})


exports.addAula = (req, res) => {
    Aulas.create({
        aula: req.body.aula,
    }).then(aula => {
        console.log(aula);
        return res.status(201).send(aula);
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
}

exports.getAllConceptos = (req, res) => {

    Conceptos.find({}).then(conceptos => {
        return res.status(200).send(conceptos);
    }, err => {
        return res.status(500).send(err);
    });
}

exports.addConcepto = (req, res) => {
    Conceptos.create({
        concepto: req.body.concepto,
        periodicidad: req.body.periodicidad
    }).then(concepto => {
        console.log(concepto);
        return res.status(201).send(concepto);
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
}

exports.getAllGrupos = (req, res) => {

    Grupos.find().then(grupos => {
        console.log(grupos);
        return res.status(200).send(grupos);
    }, err => {
        return res.status(500).send(err);
    });
}

exports.addGrupo = (req, res) => {
    Grupos.create({
        grupo: req.body.grupo.grupo,
        ciclo: req.body.grupo.ciclo,
        ciclo_name: req.body.grupo.ciclo_name,
        nivel: req.body.grupo.nivel,
        nivel_name: req.body.grupo.nivel_name,
        grado: req.body.grupo.grado,
        grado_name: req.body.grupo.grado_name,
        campus: req.body.grupo.campus,
        campus_name: req.body.grupo.campus_name,
        aula: req.body.grupo.aula,
        aula_name: req.body.grupo.aula_name,
        profesores: req.body.grupo.profesores,
        conceptos: req.body.grupo.conceptos
    })
    .then(grupo => {
        console.log(grupo);
        return res.status(201).send(grupo);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send(err);
    });
}


/*exports.getTodo = (req, res) => {
	Todos.findById(req.params.id).then(todo => {
		return res.status(200).send(todo);
	}, err => {
		return res.status(500).send(err);
	});
}

exports.getCompletedTodos = (req, res) => {
	Todos.find({done: true}).then(todos => {
		return res.status(200).send(todos);
	}, err => {
		return res.status(500).send(err);
	});
}

exports.getUncompletedTodos = (req, res) => {
	Todos.find({done: false}).then(todos => {
		return res.status(200).send(todos);
	}, err => {
		return res.status(500).send(err);
	});
}

exports.addTodo = (req, res) => {
    if(req.body.name.length <= 0){
        return res.status(400).send({msg:"Todo Name is required"});
    } else {
        Todos.create({
            name: req.body.name,
            completed: false
        }).then(todo => {
            return res.status(201).send(todo);
        }, err => {
            console.log(err);
            return res.status(500).send(err);
        });
    }
	
}

exports.editTodo = (req, res) => {
	Todos.findById(req.params.id).then(todo => {

        if(!todo){
            return res.status(404);
        } else {
            todo.name = req.body.name;
            todo.done = req.body.done;
    
            todo.save().then(todo => {
                return res.status(200).send(todo);
            }, err => {
                console.log(err);
                return res.status(500).send(err);
            });
        }

    }, err => {
        console.log(err);
        return res.status(500).send(err);
    });
}

exports.deleteTodo = (req, res) => {
	Todos.findByIdAndRemove(req.params.id).then(todo => {
        return res.status(202).send(todo);
    }, err => {
        console.log(err);
        return res.status(500).send(err);
    });
}*/