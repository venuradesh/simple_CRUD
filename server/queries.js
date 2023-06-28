export const queries = {
  create_db: `CREATE DATABASE IF NOT EXISTS simple_crud;`,
  use_db: `USE simple_crud;`,
  create_table: `CREATE TABLE IF NOT EXISTS user(
    userid INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(30) NOT NULL,
    dateofbirth DATE,
    gender ENUM('M', 'Y'),
    primary key(userid)
  );`,
};
