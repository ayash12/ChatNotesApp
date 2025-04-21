import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const testSQLiteConnection = async () => {
  try {
    const db = await SQLite.openDatabase({ name: 'chatnotes.db', location: 'default' });
    await db.executeSql('CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');

    await db.executeSql('INSERT INTO test_table (name) VALUES (?)', ['SQLite OK']);
    const results = await db.executeSql('SELECT * FROM test_table');

    const rows = results[0].rows;
    for (let i = 0; i < rows.length; i++) {
      console.log('✅ SQLite Row:', rows.item(i));
    }

    await db.close();
    return true;
  } catch (error) {
    console.error('❌ SQLite test failed:', error);
    return false;
  }
};
