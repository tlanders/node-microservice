const express = require('express');
const app = express();
const port = 3001;
const axios = require("axios");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my_secret_isnt_very_good';

const router = express.Router();
app.use(express.json());

function authRouter() {
    const authRouter = express.Router();
    authRouter.post('/key', (req,res) => {
        const {email} = req.body;
        const token = createJwtToken(email);
        console.log(`Saving ${email} with token: ${token}`);
        res.status(200).send({token});
    });
    return authRouter;
}

function todoRouter() {
    const todoRouter = express.Router();
    todoRouter.get('/', (req,res) => {
        console.log('GET /todos');
        axios.get("https://jsonplaceholder.typicode.com/todos", {
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'identity'
            }
        })
            .then(response => {
                // console.log("response", response);
                // console.log("data", response.data);
                res.status(200).send(response.data);
            })
            .catch(err => {
                console.error(err);
                res.sendStatus(500);
            });
    });

    return todoRouter;
}

function createJwtToken(email) {
    return jwt.sign({email}, SECRET_KEY, {expiresIn: '24h'});
}

app.get('/', (req, res) => {
    console.log('GET /');
    res.send('Hello World!');
});

app.use('/v1', router);
router.use('/auth', authRouter());
router.use('/todos', todoRouter());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
