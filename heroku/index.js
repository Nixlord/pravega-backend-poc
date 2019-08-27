const firebase = require('./firebase/firebase');
const db = firebase.database();
    
const postgres = require('./postgres');
postgres.connect();

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

server.get('/', (err, res) => {
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

