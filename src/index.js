const express = require('express');
const app = express();
const port = 3001;
const axios = require("axios");

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/todos', (req, res) => {
    axios.get("https://jsonplaceholder.typicode.com/todos", {
        headers: {
            Accept: 'application/json',
            'Accept-Encoding': 'identity'
        }
    })
        .then(response => {
            // console.log("response", response);
            // console.log("data", response.data);
            res.json(response.data);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
