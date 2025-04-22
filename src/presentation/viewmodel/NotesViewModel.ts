import { useEffect, useState } from 'react';
import { Note } from '../../domain/model/Note';
import { SQLiteNotesLocalDataSource } from '../../data/local/datasource/SQLiteNotesLocalDataSource';

const notesRepo = new SQLiteNotesLocalDataSource();

export const useNotesViewModel = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);  // Menambahkan state error

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const allNotes = await notesRepo.getAllNotes();
      setNotes(allNotes);
      setError(null);  // Reset error jika berhasil
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to fetch notes.');
    } finally {
      setLoading(false);
    }
  };

  const deleteNoteById = async (id: number) => {
    try {
      await notesRepo.deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id)); // Update state tanpa memanggil fetchNotes
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete note.');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,  // Return error state
    deleteNoteById,
    refresh: fetchNotes,
  };
};
