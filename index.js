const express = require('express');
const process = require('process');

const server = express()

console.log("Started Pravega Backend");

const port = process.env.PORT || 8080;
server.listen(port, (args) => {
    if (args) 
        console.log(args);
    
    console.log(`Started HTTP server at http://localhost:${port}`);
})

server.get('/', (err, res) => {
    res.send({
        message: "Hello Motu"
    })
});