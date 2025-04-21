import { Note } from '../../../domain/model/Note';
import { NotesRepository } from '../../../domain/repository/NotesRepository';
import { getDB } from '../database/NotesDatabase';

export class NotesLocalDataSource implements NotesRepository {
  async getAllNotes(): Promise<Note[]> {
    return new Promise(async (resolve, reject) => {
      (await getDB()).transaction(tx => {
        tx.executeSql(
          'SELECT * FROM notes ORDER BY updatedAt DESC;',
          [],
          (_, results) => {
            const notes: Note[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              notes.push(results.rows.item(i));
            }
            resolve(notes);
          },
          (_, error) => reject(error)
        );
      });
    });
  }

  async getNoteById(id: number): Promise<Note | null> {
    return new Promise(async (resolve, reject) => {
      (await getDB()).transaction(tx => {
        tx.executeSql(
          'SELECT * FROM notes WHERE id = ?;',
          [id],
          (_, results) => {
            if (results.rows.length > 0) {
              resolve(results.rows.item(0));
            } else {
              resolve(null);
            }
          },
          (_: any, error: any) => reject(error)
        );
      });
    });
  }

  async insertNote(note: Omit<Note, 'id'>): Promise<void> {
    const { title, content, createdAt, updatedAt } = note;
    return new Promise(async (resolve, reject) => {
      (await getDB()).transaction(tx => {
        tx.executeSql(
          'INSERT INTO notes (title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?);',
          [title, content, createdAt, updatedAt],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  }

  async updateNote(note: Note): Promise<void> {
    const { id, title, content, updatedAt } = note;
    return new Promise(async (resolve, reject) => {
      (await getDB()).transaction(tx => {
        tx.executeSql(
          'UPDATE notes SET title = ?, content = ?, updatedAt = ? WHERE id = ?;',
          [title, content, updatedAt, id],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  }

  async deleteNote(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      (await getDB()).transaction(tx => {
        tx.executeSql(
          'DELETE FROM notes WHERE id = ?;',
          [id],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  }
}
