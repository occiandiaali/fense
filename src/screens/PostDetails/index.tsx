import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  arrow: {
    position: 'absolute',
    top: 6,
    alignSelf: 'center',
    color: 'white',
    paddingBottom: 12,
    zIndex: 7,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    height: 110,
    width: '100%',
    top: 0,
    backgroundColor: '#000',
    opacity: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 21,
    position: 'absolute',
    left: 20,
    color: 'white',
    paddingBottom: 12,
    zIndex: 7,
  },
  pressable: {
    width: 150, //100,
    height: 40,
    borderRadius: 16, //8,
    backgroundColor: '#072047', //'pink',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  rowOne: {
    padding: 6,
    flexDirection: 'row',
    // bottom: '25%',
    bottom: '35%',
  },
  rowTwo: {
    // flexDirection: 'row',
    // padding: 6,
    bottom: '10%', //'18%',
  },
  rowThree: {
    flexDirection: 'row',
  },
  timestamp: {
    fontSize: 16,
    bottom: '15%',
    right: 100,
    // color: '#FFF',
    //bottom: 13,
    //left: 100,
  },
  titleTimeRow: {
    flexDirection: 'row',
    bottom: '30%',
  },
  titleTimeRowTimer: {
    width: 120,
    height: 40,
    borderRadius: 17,
    backgroundColor: '#072047',
    color: '#FFFFFF',
    fontWeight: 'bold',
    left: 27,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleTimeRowTitle: {
    right: 36,
    fontSize: 21,
    color: '#000000',
    fontWeight: 'bold',
  },
});

const PostDetails = ({route, navigation}) => {
  const {
    itemCreation,
    itemDesc,
    itemImg,
    itemPrice,
    itemName,
    itemNegotiable,
    userid,
  } = route.params;
  const [owner, setOwner] = React.useState('');
  const [ownerImg, setOwnerImg] = React.useState(
    'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg',
  );

  const res = itemCreation.toDate().toISOString();
  const ans = res.slice(0, res.indexOf('T'));

  React.useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userid)
      .get()
      .then(d => {
        console.log('User details username ', d.data()?.username);
        setOwnerImg(d.data()?.profileImg);
        setOwner(d.data()?.username);
      })
      .catch(e => console.log(e));
  }, [ans, userid]);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#000',
          opacity: 0.5,
          width: 45,
          height: 45,
          borderRadius: 23,
          position: 'absolute',
          // right: 24,
          left: 24,
          top: 32,
          zIndex: 7,
        }}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={32}
          style={styles.arrow}
        />
      </View>
      <Image
        source={{
          uri: itemImg,
        }}
        style={{width: 550, height: '62%', bottom: '16%'}}
      />
      {/* <View style={styles.imageOverlay}>
        <Text style={styles.label}>{itemName}</Text>
        <Text style={styles.timestamp}>Posted on {ans}</Text>
      </View> */}
      <View style={styles.rowOne}>
        <Image
          source={{
            // uri: 'https://images.pexels.com/photos/10450623/pexels-photo-10450623.jpeg',
            uri: ownerImg,
          }}
          style={{
            width: 50, //30,
            height: 50, //30,
            borderRadius: 25, //15,
            borderColor: '#FFFFFF',
            borderWidth: 2,
            marginRight: 8,
            bottom: 28, //6,
          }}
        />
        <Text style={{marginTop: 6, marginRight: '10%', fontSize: 16}}>
          {owner}
        </Text>
        {/* <Text
          style={{
            marginLeft: '6%',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
          }}>
          {new Intl.NumberFormat('ng-NG', {
            style: 'currency',
            currency: 'NGN',
          }).format(itemPrice)}
        </Text> */}
        <View
          style={{
            marginLeft: '6%',
            width: 150,
            height: 60,
            borderRadius: 16,
            bottom: 15,
            padding: 8,
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {new Intl.NumberFormat('ng-NG', {
              style: 'currency',
              currency: 'NGN',
            }).format(itemPrice)}
          </Text>
        </View>
      </View>
      <View style={styles.titleTimeRow}>
        <Text style={styles.titleTimeRowTitle}>{itemName}</Text>
        <Text style={styles.titleTimeRowTimer}>Ending in 30mins</Text>
      </View>
      <Text style={styles.timestamp}>Posted on {ans}</Text>
      <View style={styles.rowTwo}>
        <View>
          <Text
            style={{
              color: '#000000',
              fontWeight: 'bold',
              fontSize: 18,
              left: 8,
            }}>
            Description
          </Text>
        </View>
        <Text style={{fontSize: 18, padding: 6}}>{itemDesc}</Text>
      </View>
      <View style={styles.rowThree}>
        <Pressable onPress={() => null} style={styles.pressable}>
          <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 18}}>
            get it
          </Text>
        </Pressable>
        {itemNegotiable === true ? (
          <Pressable
            onPress={() => navigation.navigate('Chat')}
            style={styles.pressable}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 18}}>
              negotiate
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default PostDetails;
