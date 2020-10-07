import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Subheading,
} from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import img from '../../image';
import {Logout} from '../../components/modals';

const CustomDrawerContentComponent = ({ navigation: { navigate } }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SafeAreaView style={classes.root}>
      <View style={classes.header}>
        <Image source={img.logoSmallWhite} style={classes.headerImg} />
      </View>
      <View style={classes.body}>
        <TouchableOpacity
          style={classes.buttonRoot}
          onPress={() => navigate('Dashboard')}>
          <Icon name="home-outline" size={20} style={classes.buttonIcon} />
          <Subheading style={classes.buttonText}>Back to General</Subheading>
        </TouchableOpacity>
        <TouchableOpacity
          style={classes.buttonRoot}
          onPress={() => navigate('Delivery')}>
          <Icon name="noodles" size={20} style={classes.buttonIcon} />
          <Subheading style={classes.buttonText}>Nariabox Food</Subheading>
        </TouchableOpacity>
        {/* <TouchableOpacity style={classes.buttonRoot}>
          <Icon
            name="play-circle-outline"
            size={20}
            style={classes.buttonIcon}
          />
          <Subheading style={classes.buttonText}>
            N Live by Nairabox
          </Subheading>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={classes.buttonRoot}
          disabled={true}
          onPress={() => navigate('Grocery')}>
          <Icon name="cart-outline" size={20} style={classes.buttonIcon} />
          <Subheading style={classes.buttonText}>Groceries</Subheading>
        </TouchableOpacity>
        <TouchableOpacity
          style={classes.buttonRoot}
          disabled={true}
          onPress={() => navigate('Groceries')}>
          <Icon
            name="credit-card-settings-outline"
            size={20}
            style={classes.buttonIcon}
          />
          <Subheading style={classes.buttonText}>Deals & Payments</Subheading>
        </TouchableOpacity>
        <TouchableOpacity
          style={classes.buttonRoot}
          disabled={true}
          onPress={() => navigate('Vault')}>
          <Icon
            name="television-classic"
            size={20}
            style={classes.buttonIcon}
          />
          <Subheading style={classes.buttonText}>Vault</Subheading>
        </TouchableOpacity>
        {/* <TouchableOpacity style={classes.buttonRoot}>
          <Icon name="history" size={20} style={classes.buttonIcon} />
          <Subheading style={classes.buttonText}>Orders History</Subheading>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={classes.buttonRoot}>
          <Icon name="history" size={20} style={classes.buttonIcon} />
          <Subheading style={classes.buttonText}>Track Orders</Subheading>
        </TouchableOpacity> */}
      </View>

      <View style={{bottom: 20, position: 'absolute', paddingHorizontal: 25}}>
        <TouchableOpacity style={classes.buttonRoot} disabled={true}>
          <Icon name="cog" size={20} style={classes.buttonIcon} />
          <Subheading style={classes.buttonText}>Settings</Subheading>
        </TouchableOpacity>
        <TouchableOpacity
          style={classes.buttonRoot}
          onPress={() => setOpen(true)}>
          <Icon name="logout" size={20} style={classes.buttonIcon} />
          <Subheading style={classes.buttonText}>Logout</Subheading>
        </TouchableOpacity>
      </View>
      <Logout open={open} setOpen={() => setOpen(false)} />
    </SafeAreaView>
  );
};

const classes = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: 'black',
    height: 100,
    marginHorizontal: 25,
    // width: 313,
    justifyContent: 'center',
    // flex: 2,
  },
  headerImg: {
    height: 33.08,
    width: 149,
  },
  body: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 25,
    // flex: 10,
    height: "100%"
  },
  buttonRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    marginVertical: 15,
  },
  buttonIcon: {
    marginRight: 10,
    color: '#FFF',
  },
  buttonText: {
    // marginRight: 10,
    color: '#FFF',
    fontSize: 16,
    // letterSpacing: -0.16,
    // lineHeight: 22,
    fontWeight: "400"
  },
});

export default CustomDrawerContentComponent;
