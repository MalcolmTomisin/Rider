import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  SafeAreaView
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { Surface, Subheading } from "react-native-paper";
import { Button } from '../../Button';
import { colors } from '../../../theme';
import { deliveryAction } from '../../../store/actions';
import BackButton from '../../../navigation/custom/BackButton';
import TitleButton from '../../../navigation/custom/TitleButton';
import { Radio } from '../../Radio';
const {width, height} = Dimensions.get('screen');

const Reason = () => {
  const {reason} = useSelector(({delivery}) => delivery);
  const {dark} = useSelector(({theme}) => theme);
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState("");

  const selectedReason = (reas) => {
    setSelected(reas);
  }

  return (
    <Modal animationType="slide" transparent={true} visible={reason}>
      <SafeAreaView
        style={[
          classes.root,
          {backgroundColor: dark ? colors.black : colors.white},
        ]}>
        <View style={classes.surface}>
          <BackButton
            goBack={() =>
              dispatch(deliveryAction.setDeliveryData({reason: false}))
            }
          />
          <TitleButton
            label="Reason"
            rootStyle={{marginLeft: 0}}
            navigate={() =>
              dispatch(deliveryAction.setDeliveryData({reason: false}))
            }
          />
        </View>

        <View style={classes.bodyRoot}>
          <View style={classes.reasonItem}>
            <TouchableOpacity
              onPress={() => selectedReason('longDistance')}
              style={classes.reasonRadio}>
              <Radio selected={selected === 'longDistance'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectedReason('longDistance')}
              style={classes.reasonText}>
              <Subheading>Long distance</Subheading>
            </TouchableOpacity>
          </View>

          <View style={classes.reasonItem}>
            <TouchableOpacity
              style={classes.reasonRadio}
              onPress={() => selectedReason('bike')}>
              <Radio selected={selected === 'bike'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.reasonText}
              onPress={() => selectedReason('bike')}>
              <Subheading>Bike’s faulty</Subheading>
            </TouchableOpacity>
          </View>

          <View style={classes.reasonItem}>
            <TouchableOpacity
              style={classes.reasonRadio}
              onPress={() => selectedReason('personalIssues')}>
              <Radio selected={selected === 'personalIssues'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.reasonText}
              onPress={() => selectedReason('personalIssues')}>
              <Subheading>Personal issues</Subheading>
            </TouchableOpacity>
          </View>

          <View style={classes.reasonItem}>
            <TouchableOpacity
              style={classes.reasonRadio}
              onPress={() => selectedReason('busy')}>
              <Radio selected={selected === 'busy'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.reasonText}
              onPress={() => selectedReason('busy')}>
              <Subheading>Busy</Subheading>
            </TouchableOpacity>
          </View>

          <Button
            label="Done"
            rootStyle={classes.buttonRoot}
            onPress={() =>
              dispatch(deliveryAction.setDeliveryData({reason: false}))
            }
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default Reason;



const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  surface: {
    // position: "absolute",
    // top: 50,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bodyRoot: {
    marginHorizontal: 20,
  },
  buttonRoot: {
    marginVertical: 30,
  },
  reasonItem: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  reasonRadio: {},
  reasonText: {
    marginLeft: 20,
  },
});