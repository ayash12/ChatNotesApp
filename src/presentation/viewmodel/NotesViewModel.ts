import { useEffect, useState } from 'react';
import { Note } from '../../domain/model/Note';
import { NotesLocalDataSource } from '../../data/local/datasource/NotesLocalDataSource';

const notesRepo = new NotesLocalDataSource();

export const useNotesViewModel = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNotes = async () => {
    setLoading(true);
    const allNotes = await notesRepo.getAllNotes();
    setNotes(allNotes);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    refresh: fetchNotes,
  };
};
