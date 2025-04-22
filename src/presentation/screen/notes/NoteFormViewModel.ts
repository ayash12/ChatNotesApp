import { useState } from 'react';
import { Note } from '../../../domain/model/Note';
import { SQLiteNotesLocalDataSource } from '/Users/yashaja/MobileDev/reactnative/learn/ChatNotesApp/src/data/local/datasource/SQLiteNotesLocalDataSource';


const notesRepo = new SQLiteNotesLocalDataSource();

export const useNoteFormViewModel = (existingNote?: Note) => {
  const [title, setTitle] = useState(existingNote?.title || '');
  const [content, setContent] = useState(existingNote?.content || '');

  const onSave = async () => {
    const now = new Date().toISOString();
    if (existingNote) {
      await notesRepo.updateNote({
        ...existingNote,
        title,
        content,
        updatedAt: now,
      });
    } else {
      await notesRepo.insertNote({
        title,
        content,
        createdAt: now,
        updatedAt: now,
      });
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    onSave,
  };
};
