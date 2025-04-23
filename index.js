import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';

// Tambahkan ini:
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('FCM Message handled in background:', remoteMessage);
  // Kamu bisa integrasikan notifee di sini juga kalau mau tampilkan notifikasi custom
});

AppRegistry.registerComponent(appName, () => App);
