import sqlite3 from "sqlite3";

const databaseGest = () => {
  const db : sqlite3.Database = new sqlite3.Database(
    "database/result_cv.db"
  );

  let x:any;

  const execute = async (db : sqlite3.Database, sql) => {
    return new Promise((resolve, reject) => {
      db.exec(sql, (err) => {
        if (err) reject(err);
        resolve(x);
      });
    });
  };

  execute(db, "")
};

export default databaseGest;
