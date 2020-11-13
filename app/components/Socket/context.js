import React from 'react';

const WSContext = React.createContext(null);
export const WebSocket = ({children, socket}) => {
  return <WSContext.Provider value={socket}>{children}</WSContext.Provider>;
};

export default WSContext;

