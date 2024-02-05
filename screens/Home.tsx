import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';

const auth = getAuth();

export default function HomeScreen() {
    const { user } = useAuthentication();
    // alert(user);
    

    async function updateUser() {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
      lastLogin: new Date()
      });
    }
    updateUser();
    return (
        <View style={styles.container}>
        <Text>Welcome {user?.email}!</Text>
        

        <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  }
});