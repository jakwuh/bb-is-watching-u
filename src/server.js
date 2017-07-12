const express = require('express');
const bodyParser = require('body-parser');
const minimist = require('minimist');
const args = minimist(process.argv);
const {readFileSync, writeFileSync, existsSync} = require('fs');
const db = existsSync('./db.json') ? readFileSync('./db.json') : {};

const app = express();

app.use(bodyParser.json());
app.use(express.static('dist'))

app.get('/api', (req, res) => {
    const {query} = req;
    const {id} = query;
    const data = db[id] || {}

    console.log('get ' + JSON.stringify(data));

    res.json(data);
});

app.post('/api', (req, res) => {
    const {body} = req;
    const {id, message} = body;

    console.log('post ' + JSON.stringify(body));

    if (id) {
        db[id] = {message};

        writeFileSync('./db.json', JSON.stringify(db, null, 2));
    }

    res.json(db[id]);
}); 

const port = args.port || 3000
app.listen(port, () => {
    console.log('Server is listening at http://localhost:' + port);
});