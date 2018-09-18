const Ciclos = require('../models/ciclosEscolares');
const Niveles = require('../models/niveles');
const Grados = require('../models/grados');
const Campus = require('../models/campus');
const Aulas = require('../models/aulas');
const Grupos = require('../models/grupos');
const Conceptos = require('../models/conceptos');

exports.getAllCiclos = (req, res) => {
	//console.log(Estado.findAll());
	Ciclos.find({}).sort({ ciclo: -1 }).collation({locale: "en_US", numericOrdering: true}).then(ciclos => {
		return res.status(200).send(ciclos);
	}, err => {
		return res.status(500).send(err);
	});
}

//db.collection.find().sort({internalDate: 1}).collation({locale: "en_US", numericOrdering: true})


exports.addCiclo = (req, res) => {
        Ciclos.create({
            ciclo: req.body.ciclo,
        }).then(ciclo => {
            console.log(ciclo); 
            return res.status(201).send(ciclo);
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