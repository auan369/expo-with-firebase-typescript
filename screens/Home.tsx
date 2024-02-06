import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';

const auth = getAuth();
const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
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
        <Button title="Account" style={styles.button} onPress={() =>  navigation.navigate('Account')}/>
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

export default HomeScreen;