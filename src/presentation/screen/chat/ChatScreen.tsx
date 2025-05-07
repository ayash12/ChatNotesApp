import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { useChatViewModel } from '../../viewmodel/ChatViewModel';
import auth from '@react-native-firebase/auth';

const ChatScreen = () => {
  const userId = auth().currentUser?.uid || 'unknown';
  const { messages, sendMessage, connected } = useChatViewModel(userId);

  const [text, setText] = useState('');
  const [toUserId, setToUserId] = useState('');

  const handleSend = () => {
    if (text.trim() && toUserId.trim()) {
      sendMessage(text, toUserId);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {connected ? '🟢 Connected' : '🔴 Disconnected'}
      </Text>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.message}>
            <Text style={styles.from}>{item.from === userId ? 'You' : item.from}:</Text> {item.text}
          </Text>
        )}
      />

      <TextInput
        placeholder="Recipient userId"
        value={toUserId}
        onChangeText={setToUserId}
        style={styles.input}
      />

      <TextInput
        placeholder="Type your message"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginVertical: 6,
  },
  message: { paddingVertical: 4 },
  from: { fontWeight: 'bold' },
  status: { marginBottom: 8 },
});

export default ChatScreen;
