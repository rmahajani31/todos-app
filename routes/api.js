const express = require('express');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todos');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const router = express.Router();

router.use(bodyParser.json());

// POST new todo to the mongo db
router.post('/', (request, response) => {
    Todo.findOne({text: request.body.text})
    .then((todo) => {
        if(!todo) {
            const newTodo = new Todo({
                text: request.body.text
            });
            newTodo.save()
            .then((todo) => {
                response.send(todo);
            })
            .catch((error) => {
                response.status(400).send(error);
            }); 
        }
    })
    .catch((err) => {
        console.log("Error", err);
    });
});

// GET all todos in the mongo db
router.get('/', (request, response) => {
    Todo.find()
    .then((todos) => {
        response.send({todos});
    })
    .catch((error) => {
        response.status(400).send(error);
    });
});

// GET todo by id in mongo db
router.get('/:id', (request, response) => {
    const id = request.params.id;

    if(!ObjectID.isValid(id)) {
        response.status(404).send({'Error': 'Invalid ID'});
    }

    Todo.findById(id)
    .then((todo) => {
        if (!todo) {
            response.status(404).send({'Error': 'No todo for corresponding id'});
        }
        response.send(todo);
    })
    .catch((error) => {
        response.status(400).send(error);
    });
});

// DELETE todo from the mongo server
router.delete('/:id', (request, response) => {
    const id = request.params.id;

    if (!ObjectID.isValid(id)) {
        response.status(404).send({'Error': 'Invalid ID'});
    }

    Todo.findByIdAndRemove(id)
    .then((todo) => {
        if(!todo) {
            response.status(404).send({'Error': 'No todo for corresponding id'});
        }
        response.send(todo);
    })
    .catch((error) => {
        response.status(400).send(error);
    });
});

// PATCH todo in mongo db
router.patch('/:id', (request, response) => {
    const id = request.params.id;
    const body = _.pick(request.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        response.status(404).send({'Error': 'Invalid ID'});
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    })
    .then((todo) => {
        if(!todo) {
            response.status(404).send({'Error': 'No todo for corresponding id'});
        }
        response.send(todo);
    })
    .catch((error) => {
        response.status(400).send(error);
    }); 
});

module.exports = {
    router
};