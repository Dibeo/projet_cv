import sqlite3 from "sqlite3";
const databaseGest = () => {
    try {
        const db = new sqlite3.Database("database/result_c.db", sqlite3.OPEN_READWRITE);
    }
    catch (_a) {
        console.log("Table Absente\n\tCréation d'une nouvelle table.");
        const db = new sqlite3.Database("database/result_c.db", sqlite3.OPEN_CREATE);
    }
};
export default databaseGest;
