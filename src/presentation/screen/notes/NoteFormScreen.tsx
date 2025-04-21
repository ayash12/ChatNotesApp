/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {useNoteFormViewModel} from './NoteFormViewModel';

const NoteFormScreen = ({route, navigation}: any) => {
  const existingNote = route.params?.note;
  const {title, setTitle, content, setContent, onSave} =
    useNoteFormViewModel(existingNote);

  const handleSave = async () => {
    await onSave();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.input}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        multiline
        style={[styles.input, {height: 150}]}
      />
      <Button title="Save Note" onPress={handleSave} />
    </View>
  );
};

export default NoteFormScreen;

const styles = StyleSheet.create({
  container: {padding: 20, flex: 1, backgroundColor: '#fff'},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
});
