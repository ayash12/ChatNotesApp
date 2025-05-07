import React, { useEffect, useState, createContext } from 'react';
import RootNavigator from './src/navigation/RootStack';
import { FirebaseService } from './src/data/firebase/FirebaseService';
import { ChatDao } from './src/data/local/database/ChatDao';
import auth from '@react-native-firebase/auth';

// 🔹 Context untuk Auth Global
export const AuthContext = createContext<{ userId: string | null }>({ userId: null });

const App = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // 🔹 Cek dan simpan user login
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

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
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>
      <RootNavigator />
    </AuthContext.Provider>
  );
};

export default App;
