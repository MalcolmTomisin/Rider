import React from 'react';
import LiveChat from 'react-native-livechat';
import constants from '../../../utils/constants';

const Support = () => (
  <LiveChat
    license={constants.LICENSE_ID}
    redirectUri={constants.REDIRECT_URL}
    clientId={constants.CLIENT_ID}
  />
);

export default Support;
