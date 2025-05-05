import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootStack';
import { FirebaseService } from './src/data/firebase/FirebaseService';
import { ChatDao } from './src/data/local/database/ChatDao';

const App = () => {
  useEffect(() => {
     // 🔹 Inisialisasi SQLite table untuk chat
     ChatDao.createTable();

     // 🔹 Inisialisasi Firebase Cloud Messaging
    const initFCM = async () => {
      const granted = await FirebaseService.requestPermission();
      if (granted) {
        await FirebaseService.getFcmToken();
        FirebaseService.listenToMessages();
      }
    };

    initFCM();
  }, []);
  return(
    <RootNavigator />
  );
};

export default App;
