import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNotesViewModel } from '../../viewmodel/NotesViewModel';
import { useNavigation } from '@react-navigation/native';

const NotesScreen = () => {
  const { notes, loading, refresh } = useNotesViewModel();
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => navigation.navigate('NoteForm', { noteId: item.id })}>
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onRefresh={refresh}
        refreshing={loading}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NoteForm')}>
        <Text style={styles.addButtonText}>+</Text>
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
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
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
    fontSize: 30,
  },
});
