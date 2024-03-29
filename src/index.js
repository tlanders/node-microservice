const express = require('express');
const app = express();
const port = 3001;
const axios = require("axios");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my_secret_isnt_very_good';

const router = express.Router();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

const somePeople = [
    {
        'id': '1',
        'name': 'Bob Jones',
        'phone': '3334445555',
        'email': 'bobjones@gmail.com'
    },
    {
        'id': '2',
        'name': 'Jane Doe',
        'phone': '4445556666',
        'email': 'jane@doe.com'
    },
    {
        'id': '3',
        'name': 'Sam Sneed',
        'phone': '2345678901',
        'email': 'sammysneed@gmail.com'
    },
];

function peopleRouter() {
    const peopleRouter = express.Router();
    peopleRouter.get('/', (req, res) => {
        console.log('GET people');
        res.status(200).send(somePeople);
    });
    peopleRouter.get('/:id', (req, res) => {
        const id = req.params.id;
        console.log('GET person id:', id);
        const person = somePeople.find(p => p.id === id);
        if(person) {
            res.status(200).send(person);
        } else {
            res.status(404).send({'message':'Person not found'});
        }
    });
    return peopleRouter;
}

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

function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    const decoded = jwt.verify(auth, SECRET_KEY);
    console.log('Decoded user: ' + decoded.email);
    if(decoded && decoded.email) {
        next();
    } else {
        res.status(401).send({message: 'Unauthorized request.'});
    }
}

function todoRouter() {
    const todoRouter = express.Router();
    todoRouter.use(authMiddleware);
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
router.use('/people', peopleRouter());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
