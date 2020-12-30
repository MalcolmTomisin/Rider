import React, {useContext, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import {colors} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Caption} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {accountAction, feedbackAction} from '../../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api, baseURL} from '../../../api';
import WSContext from '../../Socket/context';
import {makeNetworkCalls} from '../../../utils';
import axios from 'axios';

const Switch = () => {
  const {
    isOnline,
    token,
    location: {
      coords: {latitude, longitude},
    },
  } = useSelector(({account}) => account);
  const dispatch = useDispatch();
  const socket = useContext(WSContext);

  useEffect(() => {
    if (token) {
      makeNetworkCalls({
        url: api.riderDetails,
        headers: {
          'x-auth-token': token,
        },
        method: 'get',
      })
        .then((res) => {
          const {data, msg} = res.data;
          dispatch(accountAction.setOnline({isOnline: data.onlineStatus}));
        })
        .catch((err) => {
          if (err.response) {
            const {msg} = err.response.data;
            console.log('err', msg);
            return;
          }
          console.error(err);
        });
    }
  }, [token]);

  const toggleOnlineStatus = (socket) => {
    console.log('latlon', token);
    makeNetworkCalls({
      url: api.online,
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      method: 'post',
      data: {
        latitude,
        longitude,
      },
    })
      .then((res) => {
        // const {data, msg} = res.data;
        if (isOnline) {
          socket.disconnect();
          socket.on('disconnect', () => {
            //console.log("disconnected");
          });
        } else {
          socket.connect();
        }
        dispatch(accountAction.setOnline({isOnline: !isOnline}));
      })
      .catch((err) => {
        if (err.response) {
          const {msg} = err.response.data;
          dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
          console.log('err', err);
          return;
        }
        console.error(err);
      });
  };

  return (
    <View style={[classes.root, !isOnline && classes.offlineRoot]}>
      {isOnline ? (
        <TouchableOpacity
          style={[classes.container]}
          onPress={() => {
            toggleOnlineStatus(socket);
          }}>
          {/* <Animated.View style={[classes.container]}> */}
          <Caption style={classes.title}>Online</Caption>
          <View style={classes.iconbg}>
            <Icon name="bike" size={20} />
          </View>
          {/* </Animated.View> */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[classes.container, classes.offline]}
          onPress={() => {
            toggleOnlineStatus(socket);
          }}>
          {/* <Animated.View style={[classes.container, classes.offline]}> */}
          <View style={classes.iconbg}>
            <Icon name="bike" size={20} />
          </View>
          <Caption style={[classes.offlineText]}>Offline</Caption>
          {/* </Animated.View> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Switch;

const classes = StyleSheet.create({
  root: {
    width: 90,
    height: 35,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderColor: colors.red.main,
    borderWidth: 2,
    justifyContent: 'center',
  },
  container: {
    width: 87,
    height: 33,
    borderRadius: 30,
    backgroundColor: colors.red.main,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconbg: {
    backgroundColor: colors.white,
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  title: {
    color: colors.white,
    marginLeft: 5,
  },
  offlineRoot: {
    borderColor: colors.grey.main,
    borderWidth: 2,
  },
  offline: {
    backgroundColor: colors.grey.main,
  },
  offlineText: {
    color: colors.black,
    marginRight: 5,
  },
});
