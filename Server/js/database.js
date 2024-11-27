import sqlite3 from "sqlite3";
const databaseGest = () => {
    const db = new sqlite3.Database("database/result_c.db");
};
export default databaseGest;
