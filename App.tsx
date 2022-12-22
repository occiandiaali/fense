import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/Home';
import PostingScreen from './src/screens/Posting';
import ProfileScreen from './src/screens/Profile';
import UploadScreen from './src/screens/Profile/uploads';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './src/screens/Login';
import SignUpScreen from './src/screens/Register';

import {AppContext} from './src/redux/contexts';
//import Firebase, {FirebaseProvider} from './src/utils';
import {Provider} from 'react-redux';
import {ApiProvider} from '@reduxjs/toolkit/dist/query/react';
import {productsApi} from './src/redux/apiSlice';
import store from './src/redux/store';
import auth from '@react-native-firebase/auth';
import PostDetails from './src/screens/PostDetails';
import ChatScreen from './src/screens/Chat';
import ChatHistory from './src/screens/Profile/chatHistory';

const Tab = createBottomTabNavigator();
// const HomeStack = createNativeStackNavigator();
// const PostingStack = createNativeStackNavigator();
// const ProfileStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="signin" component={LoginScreen} />
      <AuthStack.Screen name="signup" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#181b1f', //'gray',
        tabBarLabelStyle: {fontSize: 15, bottom: 8},
        tabBarStyle: {
          height: 70,
          margin: 8, //16,
          borderRadius: 16,
          bottom: 8,
          backgroundColor: 'teal', //'pink',
        },
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Camera"
        component={PostingScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [authed, setAuthed] = React.useState(false);
  const appContextValue = React.useMemo(
    () => ({
      authed,
      setAuthed,
    }),
    [authed],
  );

  function userStateChange(user) {
    if (user) {
      setAuthed(true);
    }
  }
  function currentUserStat() {
    const user = auth().currentUser;
    console.log('User email ', user?.email);
    console.log('User uid ', user?.uid);
  }

  React.useEffect(() => {
    currentUserStat();
    const subscriber = auth().onAuthStateChanged(userStateChange);
    return subscriber;
  }, []);

  return (
    <AppContext.Provider value={appContextValue}>
      <Provider store={store}>
        <ApiProvider api={productsApi}>
          <NavigationContainer>
            <StatusBar
              animated={true}
              backgroundColor="transparent"
              translucent={true}
            />
            {authed ? (
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="qrnr" component={HomeTabs} />
                <Stack.Screen
                  options={{headerShown: true, title: 'History'}}
                  name="Uploads"
                  component={UploadScreen}
                />
                <Stack.Screen
                  options={{headerShown: true, title: 'Chat'}}
                  name="Chat"
                  component={ChatScreen}
                />
                <Stack.Screen
                  options={{headerShown: false}}
                  name="PostDetails"
                  component={PostDetails}
                />
                <Stack.Screen
                  options={{headerShown: true, title: 'Archives'}}
                  name="Archives"
                  component={ChatHistory}
                />
              </Stack.Navigator>
            ) : (
              AuthStackScreen()
            )}
          </NavigationContainer>
        </ApiProvider>
      </Provider>
    </AppContext.Provider>
  );
}
