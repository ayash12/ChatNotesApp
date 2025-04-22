import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { useNoteFormViewModel } from '../notes/NoteFormViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'NoteForm'>;

const NoteFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<Props['route']>();
  const existingNote = route.params?.note; // langsung ambil objek note

  const {
    title,
    setTitle,
    content,
    setContent,
    onSave,
  } = useNoteFormViewModel(existingNote);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Validation', 'Title and Content cannot be empty!');
      return;
    }

    await onSave();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={5}
      />
      <Button
        title={existingNote ? 'Update Note' : 'Add Note'}
        onPress={handleSave}
      />
    </View>
  );
};

export default NoteFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});
