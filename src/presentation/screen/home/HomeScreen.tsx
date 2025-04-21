/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/MainStack';


const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Otomatis kembali ke LoginScreen via RootNavigator
    } catch (error) {
      console.error('Logout error: ', error);
    }
  };
  const goToNotes = () => {
    navigation.navigate('Notes'); // Navigasi ke NotesScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to ChatNotes!</Text>
      <Button title="Go to Notes" onPress={goToNotes} />
      <View style={{ height: 16 }} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 24,
  },
});
