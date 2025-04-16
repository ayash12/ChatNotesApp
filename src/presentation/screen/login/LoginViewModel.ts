import {FirebaseAuthService} from '../../../data/firebase/FirebaseAuthService';

export const LoginViewModel = {
  login: async (email: string, password: string): Promise<string | null> => {
    try {
      const uid = await FirebaseAuthService.login(email, password);
      return uid;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },
};
