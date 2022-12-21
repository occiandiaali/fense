import {
  ActivityIndicator,
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

const styles = StyleSheet.create({
  appName: {
    fontSize: 64, //48,
    fontWeight: 'bold',
    bottom: 64,
    color: 'teal',
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
  loginTxtLoadingTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  loginTxtLoadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 8,
    width: '60%',
    height: 50,
    top: 8,
    borderRadius: 25,
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

const LoginScreen = ({navigation}) => {
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [text, setText] = useState('');
  const [pass, setPass] = useState('');
  const {setAuthed} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = React.useState('');
  const isDisabled = loginDisabled || email.length < 1;

  const showToast = (msg: string) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

  // const storeEmail = async (value: string) => {
  //   try {
  //     await AsyncStorage.setItem('@email_Key', value);
  //   } catch (error) {
  //     console.log('====================================');
  //     console.log(error);
  //     console.log('====================================');
  //   }
  // };

  const handleSubmitPress = async () => {
    if (!email) {
      Alert.alert('Warning', 'Enter email');
      return;
    }
    if (!pass || pass.length < 6) {
      Alert.alert('Warning', 'Enter password greater than 5 xters');
      return;
    }
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, pass);
      setAuthed(true);
      // storeEmail(email);
      setLoading(false);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        showToast('User does not exist.');
      } else if (error.code === 'auth/invalid-email') {
        showToast('Check the email again');
      }
      console.log('HandleSub====================================');
      console.log(error);
      console.log('====================================');
    }
  };

  // const signIn = () => {
  //   if (pass.length > 5) {
  //     setAuthed(true);
  //     storeEmail(email);
  //   } else {
  //     Alert.alert('Warning', 'Secret must be more than 5 xters');
  //   }
  // };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.txt}>Welcome to</Text> */}
      <Text style={styles.appName}>fense</Text>
      <Image
        source={require('./../../assets/images/mobile_login.png')}
        accessibilityLabel="illustration of a person standing beside a mobile phone"
        style={styles.illustration}
      />
      <TextInput
        onChange={() => {
          setLoginDisabled(false);
        }}
        onChangeText={newText => setEmail(newText)}
        placeholder="you@email.address"
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
        placeholder="password"
        secureTextEntry={true}
        style={styles.inputFld}
      />

      {loading ? (
        <View style={styles.loginTxtLoadingContainer}>
          <ActivityIndicator size={'small'} style={{right: 6}} />
          <Text style={styles.loginTxtLoadingTxt}>Sign in</Text>
        </View>
      ) : (
        <Text
          disabled={isDisabled}
          onPress={handleSubmitPress}
          style={styles.loginTxt}>
          Sign in
        </Text>
      )}

      <View style={styles.register}>
        <Text style={styles.newuser}>New user?</Text>
        <Pressable onPress={() => navigation.navigate('signup')}>
          <Text style={styles.registerTxt}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
