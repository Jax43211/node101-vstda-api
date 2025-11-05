const express = require('express');
const morgan = require('morgan');
const PORT = 8484
const app = express();

app.use(express.json());

//mock data
let todoItems = [
  { todoItemId: 0, name: 'an item', priority: 3, completed: false },
  { todoItemId: 1, name: 'another item', priority: 2, completed: false },
  { todoItemId: 2, name: 'a done item', priority: 1, completed: true }
];

//track uptime
const startTime = Date.now();

//status endpoint
app.get('/', (req, res) => {
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    res.status(200).json({status: 'ok', uptime: `${uptimeSeconds}s`});
});

//get all items
app.get('/api/TodoItems', (req, res) => {
    res.status(200).json(todoItems);
});

//get one item by id
app.get('/api/TodoItems/:number', (req, res) => {
    const id = parseInt(req.params.number);
    const item = todoItems.find(i => i.todoItemId === id);
    if (!item) return res.status(404).json({error: 'Item not found'})
    res.status(200).json(item);
});

//add new item
app.post('/api/TodoItems', (req, res) => {
    const newItem = req.body;
    todoItems.push(newItem);
    res.status(201).json(newItem);
});

//delete item by id
app.delete('/api/TodoItems/:number', (req, res) => {
    const id = parseInt(req.params.number);
    const index = todoItems.findIndex(i => i.todoItemId === id);
    if (index === -1) return res.status(404).json({error: 'Item not found'});
    const deletedItem = todoItems.splice(index, 1)[0];
    res.status(200).json(deletedItem);
});



module.exports = app;
