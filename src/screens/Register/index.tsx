import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppContext} from '../../redux/contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    bottom: 38,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 250,
    height: 250,
    bottom: 36,
  },
  inputFld: {
    width: '80%',
    height: 50,
    padding: 8,
    bottom: 6,
    marginBottom: 8,
    textAlign: 'center',
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 25,
  },
  loginTxt: {
    backgroundColor: 'pink',
    width: '60%',
    height: 50,
    top: 8,
    borderRadius: 25,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  newuser: {
    paddingRight: 8,
  },
  register: {
    flexDirection: 'row',
    top: 24,
  },
  registerTxt: {
    fontWeight: 'bold',
  },
  txt: {
    fontSize: 21,
    bottom: 24,
  },
});

const SignUpScreen = ({navigation}) => {
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [text, setText] = useState('');
  const {setAuthed} = useContext(AppContext);
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const isDisabled = loginDisabled || pass.length < 5;

  const showToast = (msg: string) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

  const storeEmail = async (value: string) => {
    try {
      await AsyncStorage.setItem('@email_Key', value);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };

  const handleSubmitPress = async () => {
    if (!username) {
      showToast('Enter a user name...');
      //  Alert.alert('Warning', 'No user name set!');
      return;
    } else if (!email) {
      showToast('Email NOT set!');
      // Alert.alert('Warning', 'Enter email');
      return;
    } else if (!pass || pass.length < 8) {
      showToast('Password must be at least 8 xters!');
      // Alert.alert('Warning', 'Enter password greater than 5 xters');
      return;
    } else if (pass !== confirmPass) {
      showToast('Password must match!');
      // Alert.alert('Warning', 'Enter password greater than 5 xters');
      return;
    }
    // try {
    //   const regedUser = await auth().createUserWithEmailAndPassword(
    //     email,
    //     pass,
    //   );
    //   if (regedUser) {
    //     setAuthed(true);
    //     storeEmail(email);
    //     auth().currentUser?.updateProfile({
    //       displayName: username,
    //     });
    //   }
    // }
    try {
      const regedUser = await auth().createUserWithEmailAndPassword(
        email,
        pass,
      );
      return await firestore()
        .collection('Users')
        .doc(regedUser.user.uid)
        .set({
          username: username,
          usermail: email,
          history: [],
          chats: [],
          profileImg: '',
        })
        .then(() => {
          setAuthed(true);
          storeEmail(email);
          setPass('');
          setConfirmPass('');
          setEmail('');
          setUserName('');
        })
        .catch(e => console.log(e));
      // if (regedUser) {
      //   setAuthed(true);
      //   storeEmail(email);
      //   auth().currentUser?.updateProfile({
      //     displayName: username,
      //   });
      // }
    } catch (error) {
      console.log('SignUp submit====================================');
      console.log(error);
      console.log('====================================');
      if (error.code === 'auth/email-already-in-use') {
        // Alert.alert('Error', 'This email is already used');
        showToast('email-already-in-use');
      } else if (error.code === 'auth/invalid-email') {
        // Alert.alert('Error', 'This email is already used');
        showToast('Enter a real email address!');
      } else if (error.code === 'auth/weak-password') {
        // Alert.alert('Error', 'This email is already used');
        showToast('Enter at least 8 xters, mix of symbols & alphanumerics.');
      }
    }
  };

  const signIn = () => {
    if (pass.length > 5) {
      setAuthed(true);
      storeEmail(email);
    } else {
      Alert.alert('Warning', 'Secret must be more than 5 xters');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Sign Up</Text>
      <Image
        source={require('./../../assets/images/mobile_register.png')}
        accessibilityLabel="illustration of a person standing beside a mobile phone"
        style={styles.illustration}
      />
      <TextInput
        onChange={() => {
          setLoginDisabled(false);
        }}
        onChangeText={newText => setUserName(newText)}
        placeholder="your username"
        style={styles.inputFld}
      />
      <TextInput
        onChange={() => {
          setLoginDisabled(false);
        }}
        onChangeText={newText => setEmail(newText)}
        placeholder="your email address"
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
        style={styles.inputFld}
      />
      <TextInput
        onChange={() => {
          setLoginDisabled(false);
        }}
        onChangeText={newPass => setPass(newPass)}
        placeholder="your password"
        secureTextEntry={true}
        style={styles.inputFld}
      />
      <TextInput
        onChange={() => {
          setLoginDisabled(false);
        }}
        onChangeText={newPass => setConfirmPass(newPass)}
        placeholder="confirm password"
        secureTextEntry={true}
        style={styles.inputFld}
      />
      <Text
        disabled={isDisabled}
        onPress={handleSubmitPress}
        style={styles.loginTxt}>
        Sign Up
      </Text>
      <View style={styles.register}>
        {/* <Text style={styles.newuser}>New user?</Text> */}
        <Pressable onPress={() => navigation.navigate('signin')}>
          <Text style={styles.registerTxt}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpScreen;
