import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { StackScreenProps } from '@react-navigation/stack';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signOut } from 'firebase/auth';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { useIsFocused } from "@react-navigation/native";
// import CountryPicker from 'react-native-country-selector';
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
//   LanguageSelect,
// } from "react-country-state-city";

const auth = getAuth();
const AccountScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const { user } = useAuthentication();
    const [showPicker, setShowPicker] = React.useState(false);
    // const docRef = doc(db, "users", user.uid);
    React.useEffect(() => {
      pullUser();
    }, [user]);
    const isFocused = useIsFocused();
    const [value, setValue] = React.useState({
      email: '',
      name: '',
      petName: '',
      region: '',
    })
    
    // alert(user);

    async function pullUser() {
      const docRef = doc(db, "users", user.uid);
      await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          setValue({
            email: doc.data().name,
            name: doc.data().name,
            petName: doc.data().petName,
            region: doc.data().region
          });
          // console.log(value.name);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          
        }
      });
    }
    

    async function updateUser() {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
      lastLogin: new Date(),
      // email: value.email,
      name: value.name,
      petName: value.petName,
      region: value.region
      });
    }
    // updateUser();
    

    return (
        <View style={styles.container}>
        <Text>Welcome {user?.email}!</Text>
        <Input
          placeholder = {value.name}
          containerStyle={styles.control}
          value={value.name}
          onChangeText={(text) => setValue({ ...value, name: text })}
          // leftIcon={<Icon name='person' size={16}/>}
          label="Name"
        />
        <Input
          placeholder = {value.petName}
          containerStyle={styles.control}
          value={value.petName}
          onChangeText={(text) => setValue({ ...value, petName: text })}
          // leftIcon={<Icon name='person' size={16}/>}
          label="Pet Name"
        />
        <Input
          placeholder = {value.region}
          containerStyle={styles.control}
          value={value.region}
          onChangeText={(text) => setValue({ ...value, region: text })}
          // leftIcon={<Icon name='person' size={16}/>}
          label="Region"
        />
        {/* <CountryPicker
          visible={showPicker}
          onClose={() => setShowPicker(false)}
          onCountrySelected={(data) => {
              console.log(JSON.stringify(data))

            }}
        /> */}
        {/* <CountrySelect
        onChange={(e: any) => {
          console.log(e);
        }}
        placeHolder="Select Country"
      /> */}

        <Button title="Update Info" style={styles.button} onPress={() => updateUser()} />
        <Button title="Home Page" style={styles.button} onPress={() => navigation.navigate('Home')} />
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
  },
  controls: {
    flex: 1,
    width: '75%',
  },
  control: {
    marginTop: 10
  },
});

export default AccountScreen;