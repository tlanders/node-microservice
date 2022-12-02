const express = require('express');
const app = express();
const port = 3001;

const todos = [
    {
        userId: 1,
        id: 19,
        title: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
        completed: true
    },
    {
        userId: 1,
        id: 20,
        title: "ullam nobis libero sapiente ad optio sint",
        completed: true
    },
    {
        userId: 2,
        id: 21,
        title: "suscipit repellat esse quibusdam voluptatem incidunt",
        completed: false
    },
    {
        userId: 2,
        id: 22,
        title: "distinctio vitae autem nihil ut molestias quo",
        completed: true
    }
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/todos', (req, res) => {
    res.send("Get Todos!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
