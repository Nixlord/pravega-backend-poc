const firebase = require('./firebase/firebase');
const db = firebase.database();
//ig you read, then read this now
//if you finish that, and iM still talking, then read firebase-admin.
//if that is also done, read postgres, heroku postgres.    
const postgres = require('./postgres/postgres');
postgres.connect();

/**
Use firebase admin to change a value in realtime database.
OnChange in realtime database, trigger a cloud function.
From that function change a value in realtime database.
From server side listeners, get that change.

USE a node in realtime database to communicate changes from and to heroku.
*/

const express = require('express');
const process = require('process');

const server = express()

console.log("Started Pravega Backend");

const port = process.env.PORT || 8000;

server.listen(port, (args) => {
    if (args) 
        console.log(args);
    
    console.log(`Started HTTP server at http://localhost:${port}`);
})

server.get('/', (req, res) => {
    res.send({
        name: "Shibasis Patnaik"
    })
})

server.get('/postgres', (req, res) => {
    db.ref('/message').set({
        message: "Hello Motu"
    })

    postgres.query('SELECT * FROM friends', (err, result) => {  
        if (err) throw err;
        
        res.send(result);

        // for (let row of res.rows) {
        //     console.log(row);
        //     console.log(JSON.stringify(row));
        // }
        
        postgres.end();
    });
});



server.get('/firebase/:key/:value', (req, res) => {
    const { key, value } = req.params;
    const response = {}
    response[key] = value;

    res.send(response);
});

