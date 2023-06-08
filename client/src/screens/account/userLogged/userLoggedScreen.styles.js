import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020123',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    color: '#f5f5f5',
    fontSize: 22,
    fontWeight: 'bold'
  },
  subContainer: {
    marginTop: 60,
    width: '70%',
    gap: 10
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    marginBottom: 30,
  },
  textInput: {
    width: '85%',
    // borderWidth: 1,
    // borderColor: '#f5f5f5',
    // marginBottom: 30,
    color: '#f5f5f5',
    paddingHorizontal: 10,
  },
  links: {
    flexDirection: 'row',
    gap: 10
  },
  linksText: {
    color: '#f5f5f5',
    fontSize: 20
  }
});

export default styles;
