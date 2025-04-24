/* eslint-disable react-native/no-inline-styles */
import { useChatViewModel } from '../../viewmodel/ChatViewModel';
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const ChatScreen = () => {
  const userId = 'user123'; // ganti dengan real UID
  const { connected, messages, sendMessage } = useChatViewModel(userId);
  const [text, setText] = useState('');

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Status: {connected ? 'Connected' : 'Disconnected'}</Text>

      <FlatList
        style={{ flex: 1, marginVertical: 10 }}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 4 }}>
            <Text><Text style={{ fontWeight: 'bold' }}>{item.from}:</Text> {item.text}</Text>
          </View>
        )}
      />

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message"
        style={{ borderWidth: 1, borderColor: '#aaa', padding: 10, marginBottom: 10 }}
      />
      <Button title="Send" onPress={() => {
        sendMessage(text);
        setText('');
      }} />
    </View>
  );
};

export default ChatScreen;
