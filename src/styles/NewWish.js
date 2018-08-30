import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  view : {
    flexDirection: 'column',
    flex: 1
  },

  textInput: {
    flex: 2,
  },

  pickersView: {
    flexDirection: 'row',
    flex: 1
  },

  pickerView: {
    flex: 1
  },

  pickerFontStyle: {
    textAlign: 'center'
  },

  pickerItem: {
    height: 60,
    fontSize: 12
  },

  imageView: {
    flex: 3
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'center'
  },

  imageTextStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonView: {
    flex: 0.6,
    padding: 20,
    flexDirection: 'row'
  },

  dummyView: {
    flex: 0.3
  },
  
  buttonStyle: {
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 22,
    flex: 1,
  },

  buttonTextStyle: {
    fontSize: 12
  },
});
