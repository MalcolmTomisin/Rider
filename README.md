## Requirements

A PC with Java 14 installed and added to PATH variables
Android SDK and Platform SDKs installed
Node installed
yarn installed
Gradle 6.3

Clone repo and install using `yarn`

run on an emulator or phone using `yarn android`

### build debug or release apk

bundle javascript code and assets by `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res `

`cd android` and `./gradlew assembleDebug` for debug apk or `./gradlew assembleRelease` for release

### build debug or relase aab or bundles

bundle javascript code as above
from the android directory as above run `./gradlew bundleDebug` or `./gradlew bundleRelease` to build bundle





## Design Overview

The central logic is event based, a socket listening in for orders, on the event of an order, an action hydrates global state and the UI component is shown.

other interactions with the API are mostly REST based; updating the API on every action a rider makes. To maintain consistent state with Backend every call to the backend that "edits" an order status is followed up by a call to the basket api to update global state of the rider app.

All controllers are redux actions, please study them. Appropriate comments are made in context of use. Functions that make events happened are also commented on in the respective contexts. 

The UI structure is atomic in design; Folders in screens represent screens that are related contextually. Please refer to UI design for a holistic context.

## Note
Create/Sign up flow are deprecated currently. Rider sign up happens outside of Application

## Background Location service
The react native location package gets killed by the android system when the phone gets idle so there's a [foreground service](https://developer.android.com/guide/components/foreground-services) holding a notification to keep the service from being killed. The service only posts location updates when the application is no longer in the foreground.
The foreground service is called in 2 contexts,
1. upon sign in a native event is called that starts the foreground service
2. 



