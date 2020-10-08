
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Surface, Subheading, Caption, Paragraph } from 'react-native-paper'
import { colors } from '../../../theme';
import Icon from "react-native-vector-icons/Feather";
import {useSelector, useDispatch} from 'react-redux';


const Task = () => {
  const {dark} = useSelector(({theme}) => theme);
  const hr = {borderBottomColor: dark ? colors.hr.dark : colors.hr.light};
  return (
    <Surface style={classes.root}>
      <View style={[classes.headerRoot, hr]}>
        <View>
          <Subheading>Ready to Deliver</Subheading>
          <Caption style={classes.content}>#12942124</Caption>
        </View>
        <View style={classes.headerIconRoot}>
          <Icon name="arrow-up-right" size={15} color={colors.white} />
        </View>
      </View>
      <View style={[classes.bodyRoot, hr]}>
        <View>
          <Subheading style={classes.bodyHeaderText}>
            {' '}
            * Pickup address
          </Subheading>
          <Caption style={classes.content}>7 Hughes Avenue, Sabo, Yaba</Caption>
        </View>

        <View>
          <Subheading style={classes.bodyHeaderText}>
            * Delivery address
          </Subheading>
          <Caption style={classes.content}>
            422 Olufemi Street, Ogunlana road
          </Caption>
        </View>
      </View>

      <View style={classes.footerRoot}>
        <View>
          <Subheading style={classes.bodyHeaderText}>Payment</Subheading>
          <Paragraph style={classes.bodyHeaderText1}>₦300.00</Paragraph>
          <Caption style={classes.content}>Payment on Delivery</Caption>
        </View>

        <TouchableOpacity style={classes.buttonRoot}>
          <Caption style={classes.buttonText}>Proceed Pickup</Caption>
          <Icon name="arrow-right" size={10} color={colors.white} />
        </TouchableOpacity>
      </View>
    </Surface>
  );
}

export default Task;

const classes = StyleSheet.create({
  root: {
    // flex: 1,
    height: 300,
    elevation: 2,

    marginVertical: 10,
  },
  headerRoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerIconRoot: {
    width: 32,
    height: 32,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red.main,
  },
  content: {
    fontSize: 13,
    fontWeight: '400',
  },
  bodyRoot: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  bodyHeaderText: {
    fontSize: 15,
    color: colors.red.main,
  },
  footerRoot: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonRoot: {
    backgroundColor: colors.blue.main,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  buttonText: {
    color: colors.white,
    marginRight: 5
  },
});