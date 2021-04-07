import React from 'react';
import {Modal} from 'react-native-paper';
import {Button, OutlineButton} from '../../Button';
import {StyleSheet, Text, View} from 'react-native';
import { colors } from '../../../theme';

export default function AcceptOrder(props) {
  return (
    <Modal visible={true} contentContainerStyle={{borderRadius: 20, backgroundColor: 'white'}}>
      <Text
        style={{
          fontFamily: 'Manrope-Bold',
          fontSize: 18,
          lineHeight: 24.59,
          marginHorizontal: 44,
          marginTop: 40,
          textAlign: 'center',
          color: '#131313',
        }}>
        You have accepted the order
      </Text>

      <Text style={{textAlign: 'center', fontSize: 12, color: '#131313', marginTop: 15}}>
        Choose your next action
      </Text>
      <View style={{paddingHorizontal: 25, marginTop: 15, marginBottom: 25}}>
      <Button rootStyle={{backgroundColor: colors.green.main}} label="Start delivery now"  />
      <Button rootStyle={{backgroundColor: colors.red.main, marginTop: 15}} label="Add to your pending orders"  />
      </View>
      
    </Modal>
  );
}

const styles = StyleSheet.create({
    
})
