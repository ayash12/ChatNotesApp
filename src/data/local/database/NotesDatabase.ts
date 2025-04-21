import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'chatnotes.db' });

export const initNotesTable = async () => {
  (await db).transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        createdAt TEXT,
        updatedAt TEXT
      );`
    );
  });
};

export const getDB = () => db;
