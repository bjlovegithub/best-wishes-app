import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'transparent',
    padding: 6,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    fontFamily: 'SavoyeLetPlain',
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    left: 70,
    top: 14,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 15,
    textDecorationLine: 'underline',
  },
});
