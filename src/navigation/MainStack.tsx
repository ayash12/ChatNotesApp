import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../presentation/screen/home/HomeScreen';
import NotesScreen from '../presentation/screen/notes/NotesScreen';
import NoteFormScreen from '../presentation/screen/notes/NoteFormScreen';
import { Note } from '@domain/model/Note';
import ChatScreen from '../presentation/screen/chat/ChatScreen';

export type MainStackParamList = {
  Home: undefined;
  Notes: undefined;
  NoteForm: { note?: Note };
  Chat: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="NoteForm" component={NoteFormScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
