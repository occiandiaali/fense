import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../redux/contexts';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
//import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  appName: {
    fontSize: 32,
    color: 'teal',
    fontWeight: 'bold',
  },
  endItems: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    bottom: 6,
  },
  headerContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 8,
  },
  logoutIcon: {
    bottom: 8,
    right: 6,
  },
  userLabel: {
    paddingVertical: 8,
    right: 12,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const CustomHeaderComponent = ({cUser, cAvatar}) => {
  // const userName = 'fineboi@work.com';
  const {setAuthed} = useContext(AppContext);
  // const [img, setImg] = useState(cAvatar);
  // const [user, setUser] = useState<string | null | undefined>(cUser);

  const signOut = () => {
    setAuthed(false);
    auth().signOut();
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.appName}>fense</Text>
      <View style={styles.endItems}>
        {cUser ? (
          <Text style={styles.userLabel}>Hi, {cUser}</Text>
        ) : (
          <Text style={styles.userLabel}>Username Here</Text>
        )}
        {cAvatar ? (
          <Image
            source={{uri: cAvatar}}
            style={{
              marginRight: 18,
              bottom: 6,
              width: 30,
              height: 30,
              borderRadius: 15,
            }}
          />
        ) : (
          <View
            style={{
              marginRight: 16,
              bottom: 6,
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: 'gray',
            }}
          />
        )}
        <Ionicons
          name="log-out"
          size={24}
          onPress={signOut}
          style={styles.logoutIcon}
        />
      </View>
    </View>
  );
};

export default CustomHeaderComponent;
