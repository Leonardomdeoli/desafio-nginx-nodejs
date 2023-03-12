
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

createTable();
insertUsers();

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config);

  try {
    connection.query('SELECT * FROM people', function (error, results, fields) {
      if (error) {
        throw error;
      }

      let response = "<h1>Full Cycle Rocks!</h1><ul>";
      results.forEach(result => response += `<li>${result.name}</li>`);
      response += "</ul>";

      res.send(response);

    });
  } finally {
    connection.end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function createTable() {
  const connection = mysql.createConnection(config);
  try {
    connection.query('CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT, name varchar(255), PRIMARY KEY (id));');
  } finally {
    connection.end();
  }
}

function insertUsers() {
  const connection = mysql.createConnection(config);
  try {
    connection.query(`INSERT INTO people (name) values ('Amanda'), ('Maria'), ('Sthefany'), ('Jessica'), ('Sophia'), ('Giovanna'), ('Ana Luiza');`);
  } finally {
    connection.end();
  }
}