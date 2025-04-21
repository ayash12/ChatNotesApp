import { Note } from '../model/Note';

export interface NotesRepository {
  getAllNotes(): Promise<Note[]>;
  getNoteById(id: number): Promise<Note | null>;
  insertNote(note: Omit<Note, 'id'>): Promise<void>;
  updateNote(note: Note): Promise<void>;
  deleteNote(id: number): Promise<void>;
}
