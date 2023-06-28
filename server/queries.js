export const queries = {
  create_db: `CREATE DATABASE IF NOT EXISTS simple_crud;`,
  use_db: `USE simple_crud;`,
  create_table: `CREATE TABLE IF NOT EXISTS user(
    regno INT NOT NULL,
    username VARCHAR(30) NOT NULL,
    dateofbirth DATE,
    gender ENUM('M', 'Y'),
    primary key(regno)
  );`,
};
