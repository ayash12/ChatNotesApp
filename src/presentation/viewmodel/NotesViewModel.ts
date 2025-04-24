/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { Note } from '../../domain/model/Note';
import { SQLiteNotesLocalDataSource } from '../../data/local/datasource/SQLiteNotesLocalDataSource';

const notesRepo = new SQLiteNotesLocalDataSource();

export const useNotesViewModel = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);  // Menambahkan state error

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const allNotes = await notesRepo.getAllNotes();
      const sortedNotes = allNotes.sort((a, b) => {
        if (a.isPinned === b.isPinned) {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        return b.isPinned ? 1 : -1;
      });
      setNotes(sortedNotes);
      setError(null);  // Reset error jika berhasil
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to fetch notes.');
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes
  .filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const deleteNoteById = async (id: number) => {
    try {
      await notesRepo.deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id)); // Update state tanpa memanggil fetchNotes
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete note.');
    }
  };

  const togglePinStatus = async (note: Note) => {
    try {
      const updatedNote: Note = {
        ...note,
        isPinned: !note.isPinned,
        updatedAt: new Date().toISOString(),
      };

      await notesRepo.updateNote(updatedNote);

      setNotes(prevNotes =>
        prevNotes.map(n => (n.id === updatedNote.id ? updatedNote : n))
      );
    } catch (err) {
      console.error('Error toggling pin status:', err);
      setError('Failed to toggle pin status.');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  type GroupedNotes = {
    date: string;
    data: Note[];
  };
  const groupNotesByDate = (notes: Note[]): GroupedNotes[] => {
    const groups: { [date: string]: Note[] } = {};

    notes.forEach(note => {
      const dateKey = new Date(note.createdAt).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(note);
    });

    // Sort tanggal dari terbaru ke terlama
    const sortedDates = Object.keys(groups).sort((a, b) =>
      new Date(b).getTime() - new Date(a).getTime()
    );

    return sortedDates.map(date => ({
      date,
      data: groups[date].sort((a, b) => {
        if (a.isPinned === b.isPinned) {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        return b.isPinned ? 1 : -1;
      }),
    }));
  };

  return {
    notes: filteredNotes, // ganti dari notes ke filteredNotes
    searchQuery,
    setSearchQuery,
    loading,
    error,  // Return error state
    deleteNoteById,
    refresh: fetchNotes,
    togglePinStatus,
    groupNotesByDate,
  };
};
