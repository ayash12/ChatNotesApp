/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNotesViewModel } from '../../viewmodel/NotesViewModel';
import { useNavigation } from '@react-navigation/native';
import { Note } from '@domain/model/Note';

const NotesScreen = () => {
  const {
    notes,
    searchQuery,
    setSearchQuery,
    loading,
    refresh,
    deleteNoteById,
    togglePinStatus,
  } = useNotesViewModel();

  const navigation = useNavigation<any>();

  const handleDelete = useCallback((id: number) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteNoteById(id),
        },
      ]
    );
  }, [deleteNoteById]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderItem = useCallback(({ item }: { item: Note }) => (
    <View style={styles.noteItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.dateText}>{formatDate(item.updatedAt)}</Text>
      <Text numberOfLines={2} style={styles.content}>
        {item.content}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.pinButton]}
          onPress={() => togglePinStatus(item)}
        >
          <Text style={styles.actionText}>{item.isPinned ? 'Unpin' : 'Pin'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate('NoteForm', { note: item })}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  ), [handleDelete, navigation, togglePinStatus]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search notes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      {loading && notes.length === 0 ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : notes.length === 0 ? (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#666' }}>No notes found.</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
          renderItem={renderItem}
          onRefresh={refresh}
          refreshing={loading}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NoteForm')}
      >
        <Text style={styles.addButtonText}>＋ Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  noteItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  pinButton: {
    backgroundColor: '#FFC107',
  },
});
