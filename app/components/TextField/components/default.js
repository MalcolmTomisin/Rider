import * as React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Caption, Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {colors} from '../../../theme';
import Icon from 'react-native-vector-icons/Feather';

const TextField = (props) => {
  const theme = useSelector(({theme}) => theme);
  const [isSecure, setIsSecure] = React.useState(props.password);
  const handleSecureInputs = () => {
    setIsSecure(!isSecure);
  };
  return (
    <View style={props.rootStyle}>
      <View
        style={[
          classes.labelRoot,
          props.labelRoot,
          {backgroundColor: theme.dark ? colors.black : colors.white},
        ]}>
        <Subheading style={classes.label}>{props.label}</Subheading>
      </View>
      <View
        style={[
          classes.container,
          props.type === 'outlined' ? classes.outlined : classes.line,
          props.containerStyle,
          {paddingRight: props.password ? 30 : 0},
        ]}>
        <TextInput
          style={[classes.textField, props.TextFieldStyle]}
          {...props}
          editable
          secureTextEntry={isSecure}
        />
        {props.password ? (
          !isSecure ? (
            <TouchableOpacity onPress={handleSecureInputs}>
              <Icon name="eye-off" color="#c9c9c9" size={15} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSecureInputs}>
              <Icon name="eye" color="#c9c9c9" size={15} />
            </TouchableOpacity>
          )
        ) : null}
      </View>
      {props.error ? (
        <Text style={classes.errorMessage}>{`${props.error}`}</Text>
      ) : null}
    </View>
  );
};

TextField.defaultProps = {
  type: 'outlined',
  containerStyle: {height: 48},
};

export default TextField;

const classes = StyleSheet.create({
  root: {
    width: '100%',
  },
  labelRoot: {
    // marginBottom: -12,
    // zIndex: 1,
    width: '100%',
  },
  label: {
    fontSize: 16,
    padding: 0,
    margin: 0,
    fontWeight: '400',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    height: 48,
    alignItems: 'center'
  },
  outlined: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 7,
  },
  line: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  textField: {
    paddingHorizontal: 10,
    width: '100%',
    color: '#2AC940',
    fontSize: 16,
  },
  iconRoot: {
    justifyContent: 'center',
    flex: 0.1,
    marginHorizontal: 5,
  },
  icon: {
    opacity: 0.39,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    margin: 5,
  },
});
