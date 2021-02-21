import React, {useState} from 'react';
import {SafeAreaView, Modal} from 'react-native';
import WebView from 'react-native-webview';
import constants from '../../../utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Support = ({navigation: {navigate, goBack}}) => {
  const [visible, setVisible] = useState(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal visible={visible}>
        <Icon style={{margin: 20}} size={30} name="cancel" onPress={() => {
          setVisible(false)
          goBack();
          }} />
        <WebView
          source={{
            uri: `https://secure.livechatinc.com/licence/${constants.LICENSE_ID}/v2/open_chat.cgi`,
          }}
        />
      </Modal>
    </SafeAreaView>
  );
}

export default Support;
