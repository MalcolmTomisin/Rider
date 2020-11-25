import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import constants from '../../../utils/constants';

const Search = () => {
  const {currentEntry} = useSelector(({delivery}) => delivery);
  
  return (
    <View style={styles.container}>
      <Icon
        name="location-arrow"
        size={15}
        style={{margin: 5}}
        color="#707070"
      />
      <GooglePlacesAutocomplete
        placeholder={currentEntry?.pickupAddress}
        placeholderTextColor="#707070"
        query={{
          key: constants.GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'space-evenly',
    padding: 5,
    flexDirection: 'row',
  },
  input: {
    color: '#2AC940',
    fontSize: 16,
    fontFamily: 'Manrope-Regular',
  },
});
