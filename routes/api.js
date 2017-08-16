const express = require('express');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (request, response, next) => {
    response.send('api');
});

// POST new todo to the mongo db
router.post('/todos', (request, response) => {
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
});

// GET all todos in the mongo db
router.get('/todos', (request, response) => {
    Todo.find()
    .then((todos) => {
        response.send({todos});
    })
    .catch((error) => {
        response.status(400).send(error);
    });
});

// GET todo by id in mongo db
router.get('/todos/:id', (request, response) => {
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
router.delete('/todos/:id', (request, response) => {
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
router.patch('/todos/:id', (request, response) => {
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