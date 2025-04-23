import SQLite from 'react-native-sqlite-storage';
import { Note } from '../../../domain/model/Note';

SQLite.enablePromise(true);

export class SQLiteNotesLocalDataSource {
  private db: SQLite.SQLiteDatabase | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    this.db = await SQLite.openDatabase({ name: 'notes.db', location: 'default' });
    await this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        createdAt TEXT,
        updatedAt TEXT,
        isPinned INTEGER DEFAULT 0
      )
    `);
  }

  async insertNote(note: Omit<Note, 'id'>): Promise<void> {
    if (!this.db) {return;}
    const { title, content, createdAt, updatedAt, isPinned } = note;
    await this.db.executeSql(
      'INSERT INTO notes (title, content, createdAt, updatedAt, isPinned) VALUES (?, ?, ?, ?, ?)',
      [title, content, createdAt, updatedAt, isPinned ? 1 : 0]
    );
  }

  async updateNote(note: Note): Promise<void> {
    if (!this.db) {return;}
    const { id, title, content, updatedAt, isPinned } = note;
    await this.db.executeSql(
      'UPDATE notes SET title = ?, content = ?, updatedAt = ?, isPinned = ? WHERE id = ?',
      [title, content, updatedAt, isPinned ? 1 : 0, id]
    );
  }

  async deleteNote(id: number): Promise<void> {
    if (!this.db) {return;}
    await this.db.executeSql('DELETE FROM notes WHERE id = ?', [id]);
  }

  async getAllNotes(): Promise<Note[]> {
    if (!this.db) {return [];}
    const [results] = await this.db.executeSql('SELECT * FROM notes ORDER BY isPinned DESC, updatedAt DESC');
    const notes: Note[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      notes.push(results.rows.item(i));
    }
    return notes;
  }

  async getNoteById(id: number): Promise<Note | undefined> {
    if (!this.db) {return;}
    const [results] = await this.db.executeSql('SELECT * FROM notes WHERE id = ?', [id]);
    if (results.rows.length > 0) {
      return results.rows.item(0);
    }
    return undefined;
  }
}
