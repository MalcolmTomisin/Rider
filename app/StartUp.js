import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Navigation from './navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  configureFonts,
  DefaultTheme as PaperTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from './theme';
import {FeedBack} from './components/Feedback';
import AsyncStorage from '@react-native-community/async-storage';
import {accountAction} from './store/actions';

const StartUp = () => {
  const dispatch = useDispatch();
  const theme = useSelector(({theme}) => theme);

  React.useEffect(() => {
    handleAccount();
  }, []);

  const handleAccount = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');

      console.log('user, token', user, token);

      if (user) {
        dispatch(accountAction.setUserData(JSON.parse(user)));
      }

      if (token) {
        dispatch(accountAction.setToken(JSON.parse(token)));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const RNPTheme = {
    dark: theme.dark,
    colors: {
      ...PaperTheme.colors,
      primary: '#6200ee',
      accent: '#03dac4',
      background: theme.dark ? '#000' : 'rgb(255, 255, 255)',
      surface: theme.dark ? '#131313' : 'white',
      text: theme.dark ? '#fff' : 'black',
      error: '#B00020',
    },
    animation: {
      scale: 1.0,
    },
    roundness: 2,
    fonts: configureFonts(fontConfig),
  };

  const RNTheme = {
    dark: theme.dark,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.dark ? '#000' : 'rgb(255, 45, 85)',
      background: theme.dark ? '#000' : 'rgb(255, 255, 255)',
      card: theme.dark ? '#131313' : colors.ligthGrey,
      text: theme.dark ? '#fff' : 'rgb(28, 28, 30)',
      border: theme.dark ? colors.darkBorderColor : colors.hr,
    },
  };

  return (
    <PaperProvider theme={RNPTheme}>
      <NavigationContainer theme={RNTheme}>
        <Navigation />
      </NavigationContainer>
      <FeedBack />
    </PaperProvider>
  );
};

export default StartUp;

const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Manrope-SemiBold',
      fontWeight: '500',
    },
    medium: {
      fontFamily: 'Manrope-Medium',
      fontWeight: '600',
    },
    light: {
      fontFamily: 'Manrope-Regular',
      fontWeight: '400',
    },
    thin: {
      fontFamily: 'Manrope-Light',
      fontWeight: '300',
    },
  },
  default: {
    regular: {
      fontFamily: 'Manrope-SemiBold',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Manrope-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Manrope-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Manrope-Light',
      fontWeight: 'normal',
    },
  },
};
