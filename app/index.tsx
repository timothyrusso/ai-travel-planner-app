import WelcomePage from '@/components/pages/WelcomePage/WelcomePage';
import { auth } from '@/configs/firebaseConfig';
import { routes } from '@/constants/routes';
import { Redirect } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { View } from 'react-native';

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid, 'logged in');
      // ...
    } else {
      // User is signed out
      // ...
      console.log('logged out');
    }
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {loggedIn ? <Redirect href={routes.myTrip} /> : <WelcomePage />}
    </View>
  );
}
