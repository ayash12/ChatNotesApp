import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/AppNavigator';

const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleLogout = async () => {
        try {
          await auth().signOut();
          navigation.replace('Login'); // Balik ke login screen
        } catch (error) {
          console.error('Logout error: ', error);
        }
      };
    return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to ChatNotes!</Text>
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
  },
});
