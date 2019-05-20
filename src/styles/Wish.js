import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wishView : {
    flexDirection: 'column',
    flex: 1
  },

  wishStyle : {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },

  backgroundStyle : {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 0
  },

  thumbViewStyle : {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10
  },

  thumbImageStyle : {
    width: 20,
    height: 20
  },

  thumbTextStyle : {
    flex : 1,
    alignItems: 'flex-start',
    fontFamily: 'HoeflerText-Italic',
    fontSize: 20
  },

  dateView : {
    flex : 1
  },

  dateTextStyle : {
    fontFamily: 'HoeflerText-Italic',
    fontSize: 20
  },
});
