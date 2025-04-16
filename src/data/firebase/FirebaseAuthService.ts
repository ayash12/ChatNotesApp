import auth from '@react-native-firebase/auth';

export const FirebaseAuthService = {
  login: async (email: string, password: string): Promise<string> => {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user.uid;
  },

  logout: async (): Promise<void> => {
    await auth().signOut();
  },
};
