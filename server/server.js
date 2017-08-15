const express = require('express');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// POST new todo to the mongo db
app.post('/todos', (request, response) => {
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
app.get('/todos', (request, response) => {
    Todo.find()
    .then((todos) => {
        response.send({todos});
    })
    .catch((error) => {
        response.status(400).send(error);
    });
});

// GET todo by id in mongo db
app.get('/todos/:id', (request, response) => {
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
app.delete('/todos/:id', (request, response) => {
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
app.patch('/todos/:id', (request, response) => {
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



app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});