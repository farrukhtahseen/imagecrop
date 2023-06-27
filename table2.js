  const mysql = require('mysql2');


  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Chak@3232',
    database: 'mydb',
  });
  
  const createTableQuery = `
  CREATE TABLE names (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fileName VARCHAR(255),
    path VARCHAR(512),
  )
`;

const connection = pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error getting MySQL connection:', error);
    return;
  }

});
pool.query(createTableQuery, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted successfully');
  }
});





