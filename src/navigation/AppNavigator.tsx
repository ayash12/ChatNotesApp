import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../presentation/screen/login/LoginScreen';
import HomeScreen from '../presentation/screen/home/HomeScreen';
import NotesScreen from '../presentation/screen/notes/NotesScreen';
import NoteFormScreen from '../presentation/screen/notes/NoteFormScreen';
import { Note } from '@domain/model/Note';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Notes: undefined;
  NoteForm: { note?: Note };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="NoteForm" component={NoteFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
