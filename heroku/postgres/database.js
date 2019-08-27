const postgres = require('./postgres');

postgres.connect();

postgres.query('SELECT * FROM friends', (err, res) => {  
  if (err) throw err;
  
  for (let row of res.rows) {
      console.log(row);
      console.log(JSON.stringify(row));
  }

  postgres.end();
});