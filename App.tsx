import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootStack';
import { FirebaseService } from './src/data/firebase/FirebaseService';

const App = () => {
  useEffect(() => {
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
