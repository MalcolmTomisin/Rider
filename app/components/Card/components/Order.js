import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Surface, Subheading, Avatar, Caption, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeaterIcon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from '../../../theme';
import { Button } from '../../Button';
import { deliveryAction } from "../../../store/actions";
import { useNavigation } from "@react-navigation/native";

const Order = () => {
  const dispatch = useDispatch();
  const {dark} = useSelector(({theme}) => theme);
  const { navigate } = useNavigation();
  return (
    <View style={classes.root}>
      <Surface style={classes.container}>
        <View style={classes.orderRoot}>
          <Avatar.Text label="RT" size={45} />
          <View style={classes.orderContentRoot}>
            <Subheading>Leonard Elizabeth</Subheading>
            <View style={classes.orderContentAddress}>
              <FeaterIcon
                name="navigation"
                size={8}
                color={dark ? colors.grey.light : colors.grey.dark}
              />
              <Caption style={classes.orderContentAddressText}>
                7 Hughes avenue, Lawal Road
              </Caption>
            </View>
            <View style={classes.dash} />
            <View style={classes.dash} />
            <View style={classes.dash} />
            <View style={classes.orderContentAddress}>
              <FeaterIcon
                name="navigation"
                size={8}
                color={dark ? colors.grey.light : colors.grey.dark}
              />
              <Caption style={classes.orderContentAddressText}>
                18 Bailey Street, Off Kayode street, Lagos
              </Caption>
            </View>
            <TimeDistance />
            <View style={classes.productRoot}>
              <Caption>Picking up </Caption>
              <TouchableOpacity>
                <Caption style={classes.productId}>#jf2i321 Product</Caption>
              </TouchableOpacity>
            </View>
            <View style={classes.imgRoot}>
              <Card.Cover
                source={{uri: 'https://picsum.photos/200'}}
                style={classes.img}
              />
              <Card.Cover
                source={{uri: 'https://picsum.photos/200'}}
                style={classes.img}
              />
            </View>
          </View>
        </View>
        <Button
          label="Accept"
          rootStyle={classes.ButtonRoot}
          onPress={() => navigate("ConfirmPickupCode")}
        />

        <View style={classes.actionRoot}>
          <TouchableOpacity style={classes.actionButtonRoot}>
            <FeaterIcon
              name="phone-call"
              size={30}
              color={dark ? colors.grey.light : colors.grey.dark}
            />
            <Caption style={classes.actionButtonText}>Call</Caption>
          </TouchableOpacity>
          <TouchableOpacity style={classes.actionButtonRoot}>
            <FeaterIcon
              name="message-square"
              size={30}
              color={dark ? colors.grey.light : colors.grey.dark}
            />
            <Caption style={classes.actionButtonText}>Message</Caption>
          </TouchableOpacity>
          <TouchableOpacity
            style={classes.actionButtonRoot}
            onPress={() =>
              dispatch(deliveryAction.setDeliveryData({cancel: true}))
            }>
            <FeaterIcon name="x" size={30} color={colors.red.main} />
            <Caption
              style={[classes.actionButtonText, {color: colors.red.main}]}>
              Cancel order
            </Caption>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
};

export default Order;

const TimeDistance = () => {
  const {dark} = useSelector(({theme}) => theme);
  return (
    <View style={[classes.timeDistanceRoot, { backgroundColor: dark ? colors.white : colors.black }]}>
      <Caption style={[classes.timeDistanceText, { color: dark ? colors.black : colors.white }]} >45 mins</Caption>
      <View
        style={[
          classes.hr,
          {borderRightColor: dark ? colors.grey.main : colors.grey.light},
        ]}
      />
      <Caption style={[classes.timeDistanceText, { color: dark ? colors.black : colors.white }]} >45 mins</Caption>
    </View>
  );
}

const classes = StyleSheet.create({
  root: {position: 'absolute', bottom: 0, paddingHorizontal: 20, width: '100%'},
  container: {
    paddingVertical: 16,
    alignItems: 'center',
    // flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 1,
    paddingHorizontal: 20,
  },
  orderRoot: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  orderContentRoot: {
    marginLeft: 10,
  },
  orderContentAddress: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  orderContentAddressText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '300',
  },
  dash: {
    height: 2,
    width: 4,
    borderRightWidth: 1,
    borderRightColor: colors.grey.main,
    marginVertical: 1.5,
  },
  timeDistanceRoot: {
    height: 35,
    width: 130,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  hr: {
    height: 20,
    borderRightWidth: 1,
  },
  ButtonRoot: {
    backgroundColor: colors.green.main,
    marginVertical: 20,
  },
  productId: {
    color: colors.red.main,
  },
  productRoot: {
    alignItems: 'center',
    flexDirection: 'row',
    fontWeight: '300',
  },
  img: {
    width: 110,
    height: 90,
    marginRight: 5,
    borderRadius: 5,
  },
  imgRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  actionRoot: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%"
  },
  actionButtonRoot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 9,
    fontWeight: "400"
  },
});
