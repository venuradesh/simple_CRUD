export const queries = {
  create_db: `CREATE DATABASE IF NOT EXISTS simple_crud;`,
  use_db: `USE simple_crud;`,
  create_table: `CREATE TABLE IF NOT EXISTS user(
    regno VARCHAR(50) NOT NULL,
    username VARCHAR(30) NOT NULL,
    dateofbirth DATE,
    gender ENUM('M', 'F'),
    date_created TEXT,
    primary key(regno)
  );`,
};
