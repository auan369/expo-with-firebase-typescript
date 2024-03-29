import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {auth} from '../../config/firebase';

export function useAuthentication() {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        // alert('You are signed in');
      } else {
        // User is signed out
        setUser(undefined);
        // alert('You are signed out');
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
}