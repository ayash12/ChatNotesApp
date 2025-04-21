import React, {useState} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {View, Text, TextInput, Button, StyleSheet, Alert, Image} from 'react-native';
import {LoginViewModel} from './LoginViewModel';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      await LoginViewModel.login(email, password);
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/chatnode_icon.png')} style={styles.logo} />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={onLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
