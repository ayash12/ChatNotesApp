import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Alert, Platform } from 'react-native';

export const FirebaseService = {
  requestPermission: async (): Promise<boolean> => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enabled;
  },

  getFcmToken: async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    // Kirim token ke backend kalau perlu
  },

  setupNotificationChannel: async () => {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }
  },

  listenToMessages: () => {
    // Saat app di-foreground
    messaging().onMessage(async remoteMessage => {
      console.log('FCM Message (foreground):', remoteMessage);

      // Tampilkan alert
      Alert.alert(
        remoteMessage.notification?.title ?? '',
        remoteMessage.notification?.body ?? ''
      );

      // Tampilkan notifikasi lokal juga (biar muncul di tray)
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher', // pastikan punya icon ini di res/
        },
      });
    });

    // OPTIONAL: Jika ingin handle saat user klik notifikasi dari tray
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  },
};
