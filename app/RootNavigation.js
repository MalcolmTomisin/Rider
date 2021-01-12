import * as React from 'react';

export const navigationRef = React.createRef();


//using the navigation function outiside the navigation container
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
